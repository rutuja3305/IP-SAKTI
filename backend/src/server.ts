import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { supabase } from './lib/supabase.js'
import { groq } from './lib/groq.js'
import { embedText } from './rag/embeddings/embedText.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

// ========================================
// BASIC HEALTH CHECK
// ========================================

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'IP-SAKTI backend is running',
  })
})

// ========================================
// SUPABASE HEALTH CHECK
// ========================================

app.get('/api/health/supabase', async (_req, res) => {
  try {
    const { data, error } = await supabase.storage.listBuckets()

    if (error) {
      console.error('Supabase error:', error)

      return res.status(500).json({
        success: false,
        message: 'Supabase connection failed',
        error: error.message,
      })
    }

    res.json({
      success: true,
      message: 'Supabase connection successful',
      buckets: data.map((bucket) => bucket.name),
    })
  } catch (error) {
    console.error('Supabase connection error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to connect to Supabase',
    })
  }
})

// ========================================
// AYURVEDA AI / REAL RAG
// ========================================

app.post('/api/rag/query', async (req, res) => {
  try {
    const { question } = req.body

    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      })
    }

    console.log('')
    console.log('======================================')
    console.log('🔎 RAG QUERY')
    console.log('======================================')
    console.log(question)

    // ----------------------------------------
    // 1. EMBED USER QUESTION
    // ----------------------------------------

    const queryEmbedding = await embedText(question)

    console.log(
      `✓ Question embedded: ${queryEmbedding.length} dimensions`
    )

    if (queryEmbedding.length !== 384) {
      return res.status(500).json({
        success: false,
        message:
          'Embedding dimension mismatch. Expected 384 dimensions.',
      })
    }

    // ----------------------------------------
    // 2. VECTOR SEARCH IN SUPABASE
    // ----------------------------------------

    const { data: matches, error: searchError } =
      await supabase.rpc('match_chunks', {
        query_embedding: `[${queryEmbedding.join(',')}]`,
        match_count: 5,
      })

    if (searchError) {
      console.error('Vector search error:', searchError)

      return res.status(500).json({
        success: false,
        message: 'Vector search failed',
        error: searchError.message,
      })
    }

    if (!matches || matches.length === 0) {
      console.log('⚠ No relevant evidence found')

      return res.json({
        success: true,
        mode: 'rag',

        answer:
          'I could not find sufficiently relevant evidence in the current IP-SAKTI knowledge base for this question.',

        evidence: [],

        retrieved_chunks: 0,

        confidence: 0,

        confidence_level: 'LOW',

        confidence_type: 'retrieval',

        confidence_note:
          'Retrieval confidence indicates how strongly the available evidence matches the question. It is not a measure of factual or legal certainty.',

        human_review: {
          required: true,
          status: 'Pending Review',
        },

        disclaimer:
          'AI-assisted preliminary assessment. Not a legal determination.',
      })
    }

    console.log(
      `✓ Retrieved ${matches.length} relevant chunks`
    )

    // ----------------------------------------
    // 3. CALCULATE RETRIEVAL CONFIDENCE
    // ----------------------------------------

    const topSimilarity = Number(
      matches[0]?.similarity ?? 0
    )

    const averageTopSimilarity =
      matches.reduce(
        (sum: number, item: any) =>
          sum + Number(item.similarity || 0),
        0
      ) / matches.length

    const confidenceLevel =
      topSimilarity >= 0.70
        ? 'HIGH'
        : topSimilarity >= 0.50
          ? 'MODERATE'
          : 'LOW'

    console.log(
      `✓ Top similarity: ${topSimilarity.toFixed(3)}`
    )

    console.log(
      `✓ Retrieval confidence: ${confidenceLevel}`
    )

    // ----------------------------------------
    // 4. BUILD EVIDENCE CONTEXT
    // ----------------------------------------

    const evidenceContext = matches
      .map(
        (match: any, index: number) => `
SOURCE ${index + 1}

Title:
${match.title || 'Not specified'}

Authority:
${match.authority || 'Not specified'}

Jurisdiction:
${match.jurisdiction || 'Not specified'}

Document Type:
${match.document_type || 'Not specified'}

Version:
${match.version || 'Not specified'}

Evidence Similarity:
${Number(match.similarity || 0).toFixed(3)}

CONTENT:
${match.content || ''}
`
      )
      .join(
        '\n-----------------------------\n'
      )

    // ----------------------------------------
    // 5. ASK GROQ TO EXPLAIN THE EVIDENCE
    // ----------------------------------------

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',

      messages: [
        {
          role: 'system',

          content: `
You are IP-SAKTI Sahayak, an AI research assistant
for Ayurveda, intellectual property, patents,
traditional knowledge, biodiversity and regulatory guidance.

Your job is to explain the retrieved evidence clearly
and help the user understand what it means.

IMPORTANT RULES:

1. Use the retrieved evidence as the primary basis
   for your answer.

2. Do not invent laws, rules, sources, dates,
   requirements or facts that are not supported
   by the retrieved evidence.

3. If the retrieved evidence is insufficient,
   conflicting or unclear, say so clearly.

4. Do not make a final legal determination.

5. Do not claim that an invention is definitely
   patentable or non-patentable.

6. Distinguish between:
   - what the source says,
   - what it may mean for the user's question,
   - and what the user should investigate next.

7. When referring to evidence, mention the relevant
   source title naturally where appropriate.

8. Keep the explanation understandable for
   non-technical users.

9. Where appropriate, recommend review by an
   appropriate IP, regulatory, Ayurveda or
   biodiversity expert.

10. This is an AI-assisted preliminary assessment
    and not legal advice.

RETRIEVED EVIDENCE:

${evidenceContext}
          `,
        },

        {
          role: 'user',
          content: question,
        },
      ],

      temperature: 0.2,
    })

    const answer =
      response.choices[0]?.message?.content ?? ''

    // ----------------------------------------
    // 6. PREPARE SOURCE INFORMATION
    // ----------------------------------------

    const evidence = matches.map((match: any) => ({
      source:
        match.title || 'Unknown source',

      organization:
        match.authority || 'Not specified',

      jurisdiction:
        match.jurisdiction || 'Not specified',

      document_type:
        match.document_type || 'Not specified',

      version:
        match.version || null,

      similarity:
        Number(
          Number(match.similarity || 0).toFixed(3)
        ),
    }))

    // ----------------------------------------
    // 7. RETURN RAG RESPONSE
    // ----------------------------------------

    res.json({
      success: true,

      mode: 'rag',

      answer,

      evidence,

      retrieved_chunks: matches.length,

      // This is retrieval strength,
      // NOT factual/legal certainty.
      confidence: Number(
        averageTopSimilarity.toFixed(2)
      ),

      confidence_level: confidenceLevel,

      confidence_type: 'retrieval',

      confidence_note:
        'Retrieval confidence indicates how strongly the retrieved evidence matches the question. It is not a measure of factual or legal certainty.',

      human_review: {
        required: true,
        status: 'Pending Review',
      },

      disclaimer:
        'AI-assisted preliminary assessment. Not a legal determination.',
    })
  } catch (error) {
    console.error('RAG error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to process the question',

      error:
        error instanceof Error
          ? error.message
          : String(error),
    })
  }
})

// ========================================
// INNOVATION ANALYZER
// ========================================

app.post('/api/innovation/analyze', async (req, res) => {
  try {
    const {
      name,
      ingredients,
      innovation,
      biologicalMaterial,
      traditionalKnowledge,
      jurisdictions,
    } = req.body

    if (!name || !innovation) {
      return res.status(400).json({
        success: false,
        message:
          'Innovation name and innovation description are required',
      })
    }

    // ----------------------------------------
    // STRUCTURED RISK ASSESSMENT
    // ----------------------------------------

    const hasBiologicalMaterial =
      biologicalMaterial === true

    const hasTraditionalKnowledge =
      traditionalKnowledge === true

    const hasInternationalJurisdiction =
      Array.isArray(jurisdictions) &&
      jurisdictions.some(
        (item: string) =>
          item.toLowerCase() !== 'india'
      )

    let patentRisk = 'LOW'
    let tkRisk = 'LOW'
    let absRisk = 'LOW'
    let regulatoryRisk = 'MEDIUM'
    let internationalRisk = 'LOW'

    if (hasTraditionalKnowledge) {
      tkRisk = 'HIGH'
      patentRisk = 'MEDIUM'
    }

    if (hasBiologicalMaterial) {
      absRisk = 'MEDIUM'
      regulatoryRisk = 'HIGH'
    }

    if (hasInternationalJurisdiction) {
      internationalRisk = 'MEDIUM'
    }

    if (
      hasTraditionalKnowledge &&
      hasBiologicalMaterial
    ) {
      patentRisk = 'MEDIUM'
      tkRisk = 'HIGH'
      absRisk = 'HIGH'
      regulatoryRisk = 'HIGH'
    }

    // ----------------------------------------
    // GROQ EXPLANATION
    // ----------------------------------------

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',

      messages: [
        {
          role: 'system',

          content: `
You are IP-SAKTI Sahayak, an AI research assistant
for Ayurveda, intellectual property, traditional
knowledge, biodiversity and regulatory guidance.

Provide a concise preliminary assessment of an
Ayurvedic innovation.

Relevant evidence domains include:

- The Patents Act, 1970
- AYUSH Related Inventions Guidelines 2025
- Traditional Knowledge Digital Library (TKDL)
- Guidelines for Processing Patent Applications
  Relating to Traditional Knowledge and Biological Material
- Biological Diversity Act, 2023
- International intellectual property considerations

Explain:

1. Why the identified risks may matter
2. What the innovator should investigate
3. What information or documents may be required
4. Why expert review may be appropriate

Do not provide a final legal determination.

This is an AI-assisted preliminary assessment.
          `,
        },

        {
          role: 'user',

          content: `
Innovation Name:
${name}

Ingredients / Materials:
${
  Array.isArray(ingredients)
    ? ingredients.join(', ')
    : ingredients || 'Not specified'
}

Innovation Description:
${innovation}

Biological Material:
${hasBiologicalMaterial ? 'Yes' : 'No'}

Traditional Knowledge:
${hasTraditionalKnowledge ? 'Yes' : 'No'}

Target Jurisdictions:
${
  Array.isArray(jurisdictions)
    ? jurisdictions.join(', ')
    : jurisdictions || 'India'
}
          `,
        },
      ],

      temperature: 0.2,
    })

    const explanation =
      response.choices[0]?.message?.content ?? ''

    // ----------------------------------------
    // RESPONSE
    // ----------------------------------------

    res.json({
      success: true,

      mode: 'prototype-demo',

      innovation: {
        name,
        ingredients,
        description: innovation,
        biologicalMaterial:
          hasBiologicalMaterial,
        traditionalKnowledge:
          hasTraditionalKnowledge,
        jurisdictions,
      },

      risks: {
        patent: patentRisk,
        traditionalKnowledge: tkRisk,
        abs: absRisk,
        regulatory: regulatoryRisk,
        international: internationalRisk,
      },

      explanation,

      evidence: [
        {
          source: 'The Patents Act, 1970',
          organization: 'IP India',
          jurisdiction: 'India',
        },

        {
          source:
            'AYUSH Related Inventions Guidelines 2025',
          organization: 'AYUSH',
          jurisdiction: 'India',
        },

        {
          source:
            'Guidelines for Processing Patent Applications Relating to Traditional Knowledge and Biological Material',
          organization: 'IP India',
          jurisdiction: 'India',
        },

        {
          source:
            'Traditional Knowledge Digital Library (TKDL)',
          organization: 'CSIR',
          jurisdiction: 'India',
        },

        {
          source:
            'Biological Diversity Act, 2023',
          organization:
            'National Biodiversity Authority',
          jurisdiction: 'India',
        },
      ],

      confidence: 0.84,

      humanReview: {
        required: true,
        status: 'Pending Review',
      },

      disclaimer:
        'AI-assisted preliminary assessment. Not a legal determination.',
    })
  } catch (error) {
    console.error(
      'Innovation analysis error:',
      error
    )

    res.status(500).json({
      success: false,
      message: 'Unable to analyze innovation',
    })
  }
})

// ========================================
// SERVER
// ========================================

app.listen(PORT, () => {
  console.log(
    `🚀 IP-SAKTI backend running on http://localhost:${PORT}`
  )
})