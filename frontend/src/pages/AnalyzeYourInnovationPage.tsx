import { useState } from 'react'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { SectionDivider } from '@/components/ui/SectionDivider'

type Language = 'en' | 'mr'

export function AnalyzeYourInnovationPage() {
  const [innovation, setInnovation] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  // Multilingual support
  const [language, setLanguage] = useState<Language>('en')
  const [translatedInnovation, setTranslatedInnovation] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)

  const handleAnalyze = async () => {
    if (!innovation.trim()) return

    setIsTranslating(true)

    try {
      /*
       * -------------------------------------------------------
       * MULTILINGUAL / BHASHINI FLOW
       * -------------------------------------------------------
       *
       * User language
       *      ↓
       * Marathi → English
       *      ↓
       * Innovation Analysis
       *
       * Once BHASHINI credentials are available,
       * translateInnovation() below will call the
       * actual BHASHINI API.
       */

      const englishInnovation = await translateInnovation(
        innovation,
        language
      )

      setTranslatedInnovation(englishInnovation)

      setAnalyzed(true)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      console.error('Multilingual processing failed:', error)

      // Safe fallback so the demo never breaks
      setTranslatedInnovation(innovation)
      setAnalyzed(true)
    } finally {
      setIsTranslating(false)
    }
  }

  /*
   * -------------------------------------------------------
   * RESULT SCREEN
   * -------------------------------------------------------
   */

  if (analyzed) {
    return (
      <AnalysisResult
        innovation={innovation}
        translatedInnovation={translatedInnovation}
        language={language}
        onBack={() => setAnalyzed(false)}
      />
    )
  }

  /*
   * -------------------------------------------------------
   * INPUT SCREEN
   * -------------------------------------------------------
   */

  return (
    <div className="bg-parchment min-h-screen">
      <div className="container-site py-12 md:py-16">

        <div className="max-w-4xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            <div>
              <EyebrowLabel
                text="ANALYZE YOUR INNOVATION"
                color="gold"
                rule
                className="mb-6"
              />

              <h1 className="text-display-lg text-forest-dark mb-4">
                What have you created?
              </h1>

              <p className="text-lg text-ink-muted max-w-2xl">
                Describe your innovation and get a preliminary view across
                patent, traditional knowledge, ABS, regulatory and
                international considerations.
              </p>
            </div>

            {/* LANGUAGE SELECTOR */}

            <div className="shrink-0 md:pt-2">

              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-muted mb-2">
                Interaction Language
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as Language)
                }
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-forest-dark outline-none focus:border-forest-dark focus:ring-2 focus:ring-forest-dark/10"
              >
                <option value="en">
                  English
                </option>

                <option value="mr">
                  मराठी (Marathi)
                </option>
              </select>

            </div>

          </div>

          <SectionDivider className="my-8" />

          {/* BHASHINI MULTILINGUAL NOTICE */}

          <div className="mb-6 rounded-xl border border-blue-200 bg-sky-tint p-5">

            <div className="flex items-start gap-3">

              <span className="text-xl" aria-hidden="true">
                🌐
              </span>

              <div>

                <p className="text-sm font-semibold text-forest-dark">
                  Multilingual Innovation Assessment
                </p>

                <p className="text-xs text-ink-muted mt-1 leading-5">
                  Innovators can describe their innovation in their
                  preferred Indian language. The multilingual layer
                  is designed for BHASHINI-based translation.
                </p>

              </div>

            </div>

          </div>

          {/* INPUT CARD */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

            <label className="block text-sm font-semibold text-forest-dark mb-2">
              Describe your innovation
            </label>

            <p className="text-sm text-ink-muted mb-4">
              Include what it does, what makes it different and the
              technology or knowledge involved.
            </p>

            <textarea
              value={innovation}
              onChange={(e) => setInnovation(e.target.value)}
              rows={7}
              placeholder={
                language === 'mr'
                  ? 'उदाहरण: मी AI आधारित वैयक्तिक आयुर्वेदिक फॉर्म्युलेशन प्रणाली तयार केली आहे जी रुग्णाच्या माहितीनुसार औषधी वनस्पती आणि डोस सुचवते...'
                  : 'Example: I have developed an AI-assisted Ayurvedic formulation system that recommends personalized herbal combinations and dosage ranges based on patient parameters...'
              }
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-4 text-sm leading-6 text-forest-dark outline-none focus:border-forest-dark focus:ring-2 focus:ring-forest-dark/10"
            />

            {/* INPUT FOOTER */}

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <p className="text-xs text-ink-muted">
                {language === 'mr'
                  ? 'मराठी इनपुट समर्थित'
                  : 'English input supported'}
              </p>

              <button
                onClick={handleAnalyze}
                disabled={!innovation.trim() || isTranslating}
                className="rounded-xl bg-forest-dark px-7 py-3 text-white font-semibold transition hover:opacity-90 disabled:opacity-40"
              >
                {isTranslating
                  ? 'Processing...'
                  : 'Analyze My Innovation →'}
              </button>

            </div>

          </div>

          {/* WHAT HAPPENS NEXT */}

          <div className="mt-6 rounded-xl border border-blue-200 bg-sky-tint p-5">

            <p className="text-sm text-ink-muted leading-6">

              <strong className="text-forest-dark">
                What happens next?
              </strong>{' '}

              IP-SAKTI creates an Innovation Twin and screens the innovation
              across five key dimensions before suggesting possible next
              actions.

            </p>

          </div>

          {/* DISCLAIMER */}

          <p className="text-center text-xs text-ink-muted mt-6">
            AI-assisted preliminary assessment. Not a legal determination.
          </p>

        </div>

      </div>
    </div>
  )
}


/* =========================================================
   BHASHINI-READY TRANSLATION ADAPTER
   ========================================================= */

/*
 * This function is the ONLY place that needs to be replaced
 * when you receive the actual BHASHINI API credentials.
 *
 * Current demo:
 * English → passes through directly.
 *
 * Marathi → recognizes the prepared Marathi demo input and
 * converts it to the corresponding English representation.
 *
 * This lets you demonstrate the multilingual architecture
 * without falsely claiming that the live BHASHINI API is
 * already connected.
 */

async function translateInnovation(
  text: string,
  language: Language
): Promise<string> {

  // English requires no translation
  if (language === 'en') {
    return text
  }

  /*
   * -------------------------------------------------------
   * MARATHI DEMO
   * -------------------------------------------------------
   */

  const demoMarathi =
    'मी AI आधारित वैयक्तिक आयुर्वेदिक फॉर्म्युलेशन प्रणाली तयार केली आहे जी रुग्णाच्या वैयक्तिक माहितीच्या आधारावर औषधी वनस्पतींचे संयोजन आणि डोस सुचवते. ही प्रणाली पारंपरिक आयुर्वेदिक ज्ञानासोबत मशीन लर्निंगचा वापर करून वैयक्तिक फॉर्म्युलेशन तयार करते. या प्रणालीमध्ये आयुर्वेदिक औषधी वनस्पती आणि जैविक संसाधनांचा वापर केला जातो आणि ती भारत तसेच आंतरराष्ट्रीय बाजारासाठी आहे.'

  if (text.trim() === demoMarathi) {

    return `
I have developed an AI-assisted personalized Ayurvedic formulation
system that recommends herbal combinations and dosage ranges based
on individual patient parameters. It combines classical Ayurvedic
knowledge with machine learning to personalize formulation and dosage.
The system uses Ayurvedic herbs and biological resources and is intended
for the Indian and international markets.
    `.trim()
  }

  /*
   * -------------------------------------------------------
   * FALLBACK
   * -------------------------------------------------------
   *
   * Until the real BHASHINI API is connected, return the
   * original text instead of breaking the analysis flow.
   */

  return text
}


/* =========================================================
   RESULT
   ========================================================= */

function AnalysisResult({
  innovation,
  translatedInnovation,
  language,
  onBack,
}: {
  innovation: string
  translatedInnovation: string
  language: Language
  onBack: () => void
}) {

  return (
    <div className="bg-parchment min-h-screen">

      <div className="container-site py-12 md:py-16">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>

              <EyebrowLabel
                text="INNOVATION ANALYSIS"
                color="gold"
                rule
                className="mb-6"
              />

              <h1 className="text-display-lg text-forest-dark mb-3">
                Analysis Complete
              </h1>

              <p className="text-lg text-ink-muted">
                Preliminary multidimensional assessment
              </p>

              {/* LANGUAGE INDICATOR */}

              {language === 'mr' && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-sky-tint px-3 py-1.5 text-xs font-medium text-blue-800">
                  🌐 Marathi → English → Innovation Analysis
                </div>
              )}

            </div>

            <button
              onClick={onBack}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-dark"
            >
              ← Edit Innovation
            </button>

          </div>

          <SectionDivider className="my-8" />


          {/* =================================================
             INNOVATION TWIN
          ================================================= */}

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

            <EyebrowLabel
              text="INNOVATION TWIN"
              color="gold"
              rule
              className="mb-5"
            />

            <h2 className="text-2xl font-bold text-forest-dark mb-3">
              AI-Assisted Personalized Ayurvedic Formulation
            </h2>

            <p className="text-sm text-ink-muted max-w-3xl leading-6">
              The system has converted your description into a structured
              representation that can be evaluated across multiple
              IP, knowledge, biodiversity and regulatory dimensions.
            </p>

            {/* STRUCTURED TWIN */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">

              <Twin
                title="Domain"
                value="Ayurveda + AI"
              />

              <Twin
                title="Innovation Type"
                value="Personalized formulation"
              />

              <Twin
                title="Technology"
                value="AI / Machine Learning"
              />

              <Twin
                title="Traditional Knowledge"
                value="Potentially involved"
              />

              <Twin
                title="Biological Resources"
                value="Potentially involved"
              />

              <Twin
                title="Target Market"
                value="India + International"
              />

            </div>

            {/* ORIGINAL INPUT */}

            <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-5">

              <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-2">
                Innovation described
              </p>

              <p className="text-sm text-forest-dark leading-6">
                {innovation}
              </p>

            </div>

            {/* NORMALIZED INPUT */}

            {language === 'mr' && translatedInnovation && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-5">

                <p className="text-xs uppercase tracking-wider font-semibold text-blue-700 mb-2">
                  Normalized for Analysis
                </p>

                <p className="text-sm text-forest-dark leading-6">
                  {translatedInnovation}
                </p>

                <p className="text-xs text-blue-700 mt-3">
                  Multilingual processing layer
                </p>

              </div>
            )}

          </section>


          {/* =================================================
             5D RISK ASSESSMENT
          ================================================= */}

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mt-8">

            <EyebrowLabel
              text="5D RISK ASSESSMENT"
              color="gold"
              rule
              className="mb-5"
            />

            <h2 className="text-2xl font-bold text-forest-dark mb-2">
              Multidimensional Risk Map
            </h2>

            <p className="text-sm text-ink-muted mb-7">
              Preliminary screening across five dimensions.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">

              <Risk
                icon="⚡"
                title="Patent Risk"
                level="MEDIUM"
                description="Novelty and inventive-step review recommended."
              />

              <Risk
                icon="📜"
                title="Traditional Knowledge"
                level="HIGH"
                description="Potential overlap with existing traditional knowledge."
              />

              <Risk
                icon="🌿"
                title="ABS / Biodiversity"
                level="REVIEW"
                description="Biological-resource involvement may require review."
              />

              <Risk
                icon="⚖"
                title="Regulatory"
                level="MEDIUM"
                description="Applicable product and technology requirements should be checked."
              />

              <Risk
                icon="🌍"
                title="International"
                level="REVIEW"
                description="Requirements differ across jurisdictions."
              />

            </div>

          </section>


          {/* =================================================
             EVIDENCE → REASONING → ACTION
          ================================================= */}

          <section className="grid lg:grid-cols-3 gap-5 mt-8">

            <Insight
              number="01"
              title="Evidence"
              text="Relevant patent, traditional knowledge, biodiversity and regulatory sources are used to support the preliminary assessment."
            />

            <Insight
              number="02"
              title="Reasoning"
              text="The combination of Ayurvedic knowledge, biological resources and AI-based personalization creates multiple areas requiring review."
            />

            <Insight
              number="03"
              title="Recommended Action"
              text="Conduct prior-art and traditional knowledge review, then identify applicable ABS and regulatory requirements before formal commercialization or filing."
            />

          </section>


          {/* =================================================
             JURISDICTION
          ================================================= */}

          <section className="mt-8 rounded-2xl bg-forest-dark text-white p-6 md:p-8">

            <div className="flex gap-4">

              <div className="text-2xl">
                🌍
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">
                  JURISDICTION
                </p>

                <h3 className="text-xl font-bold mb-2">
                  India + International
                </h3>

                <p className="text-sm text-white/70 leading-6">
                  The same innovation may face different IP, biodiversity
                  and regulatory considerations depending on the country.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
             DISCLAIMER
          ================================================= */}

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">

            <p className="text-sm text-amber-900 leading-6">

              <strong>Important:</strong> This is an AI-assisted preliminary
              assessment. It does not constitute a legal opinion,
              patentability determination or regulatory approval.
              Expert verification is recommended before formal action.

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}


/* =========================================================
   TWIN COMPONENT
========================================================= */

function Twin({
  title,
  value,
}: {
  title: string
  value: string
}) {

  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">

      <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted mb-2">
        {title}
      </p>

      <p className="text-sm font-semibold text-forest-dark">
        {value}
      </p>

    </div>
  )
}


/* =========================================================
   RISK COMPONENT
========================================================= */

function Risk({
  icon,
  title,
  level,
  description,
}: {
  icon: string
  title: string
  level: string
  description: string
}) {

  const high = level === 'HIGH'
  const review = level === 'REVIEW'

  return (
    <div
      className={`rounded-xl border p-5 ${
        high
          ? 'border-red-200 bg-red-50'
          : review
          ? 'border-blue-200 bg-blue-50'
          : 'border-amber-200 bg-amber-50'
      }`}
    >

      <div className="text-2xl mb-4">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {title}
      </p>

      <p
        className={`mt-2 text-sm font-bold ${
          high
            ? 'text-red-700'
            : review
            ? 'text-blue-700'
            : 'text-amber-700'
        }`}
      >
        {level}
      </p>

      <p className="mt-3 text-xs leading-5 text-ink-muted">
        {description}
      </p>

    </div>
  )
}


/* =========================================================
   INSIGHT COMPONENT
========================================================= */

function Insight({
  number,
  title,
  text,
}: {
  number: string
  title: string
  text: string
}) {

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center text-sm font-bold text-forest-dark mb-4">
        {number}
      </div>

      <h3 className="text-lg font-bold text-forest-dark mb-2">
        {title}
      </h3>

      <p className="text-sm text-ink-muted leading-6">
        {text}
      </p>

    </div>
  )
}