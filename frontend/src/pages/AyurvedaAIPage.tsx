import React, { useState } from "react";


interface EvidenceItem {
  title?: string;
  source?: string;
  authority?: string;
  jurisdiction?: string;
  document_type?: string;
  version?: string;
  similarity?: number;
}

interface RagResponse {
  success: boolean;
  answer?: string;
  evidence?: EvidenceItem[];
  retrieved_chunks?: number;
  confidence?: number;
  confidence_level?: "HIGH" | "MODERATE" | "LOW";
  confidence_type?: string;
  confidence_note?: string;
  human_review?: boolean;
  disclaimer?: string;
}

const suggestedQuestions = [
  "What are the patentability requirements for an Ayurvedic invention in India?",
  "What is TKDL and how does it protect traditional knowledge?",
  "What is Access and Benefit Sharing under Indian biodiversity law?",
  "Can an Ayurvedic formulation be patented in India?",
];

export  function AyurvedaAIPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<RagResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async (customQuestion?: string) => {
    const finalQuestion = (customQuestion ?? question).trim();

    if (!finalQuestion) return;

    setQuestion(finalQuestion);
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/rag/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: finalQuestion,
        }),
      });

      const data: RagResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Unable to get a response from the AI assistant.");
      }

      setResponse(data);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while connecting to the Ayurveda AI Assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  const confidenceLevel =
    response?.confidence_level ||
    (response?.confidence && response.confidence >= 0.7
      ? "HIGH"
      : response?.confidence && response.confidence >= 0.5
      ? "MODERATE"
      : "LOW");

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-slate-800">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-xl text-white shadow-sm">
                  ✦
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    Ayurveda AI Assistant
                  </h1>

                  <p className="text-sm text-slate-500">
                    Evidence-backed guidance for Ayurveda, IP & traditional
                    knowledge
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              RAG VERIFIED
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* INTRO */}
        {!response && !loading && (
          <section className="mx-auto max-w-4xl pt-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
              🌿
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Ask about Ayurveda & Intellectual Property
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Explore patents, traditional knowledge, biodiversity, ABS,
              regulatory requirements and related IP concepts using
              source-backed AI responses.
            </p>

            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
              {suggestedQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => askQuestion(item)}
                  className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-600">→</span>

                    <span className="text-sm leading-6 text-slate-700 group-hover:text-slate-900">
                      {item}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* QUESTION BOX */}
        <section
          className={`mx-auto max-w-4xl ${
            response || loading ? "mb-8" : "mt-10"
          }`}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  askQuestion();
                }
              }}
              placeholder="Ask a question about patents, TKDL, ABS, Ayurveda IP, regulations..."
              rows={3}
              className="w-full resize-none border-0 bg-transparent px-3 py-2 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400"
            />

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="px-3 text-xs text-slate-400">
                Press Enter to ask · Shift + Enter for new line
              </span>

              <button
                onClick={() => askQuestion()}
                disabled={loading || !question.trim()}
                className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analysing..." : "Ask AI →"}
              </button>
            </div>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <section className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Finding relevant evidence...
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Retrieving trusted sources before generating the answer.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ERROR */}
        {error && (
          <section className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              {error}
            </div>
          </section>
        )}

        {/* RESPONSE */}
        {response && !loading && (
          <section className="mx-auto max-w-5xl space-y-6">
            {/* QUESTION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your question
              </div>

              <p className="text-base font-medium leading-7 text-slate-800">
                {question}
              </p>
            </div>

            {/* AI ANSWER */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* ANSWER HEADER */}
              <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                    ✨
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Ayurveda AI Response
                    </h3>

                    <p className="text-xs text-slate-500">
                      Generated using retrieved evidence
                    </p>
                  </div>
                </div>

                {/* CONFIDENCE */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    Evidence Confidence
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      confidenceLevel === "HIGH"
                        ? "bg-emerald-100 text-emerald-700"
                        : confidenceLevel === "MODERATE"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {confidenceLevel}
                  </span>
                </div>
              </div>

              {/* ANSWER BODY */}
              <div className="px-6 py-7 md:px-8">
                <div className="ai-answer">
                  <div className="whitespace-pre-wrap text-[15px] leading-7 text-slate-600">
  {response.answer}
</div>
                </div>
              </div>
            </div>

            {/* EVIDENCE */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Evidence & Sources
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Retrieved from the IP-SAKTI knowledge base
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {response.retrieved_chunks ?? 0} sources
                  </span>
                </div>
              </div>

              <div className="space-y-3 p-6">
                {response.evidence?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-emerald-700 shadow-sm">
                        {index + 1}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-semibold leading-6 text-slate-900">
                         {item.source || item.title || "Source document"}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.authority && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
                              {item.authority}
                            </span>
                          )}

                          {item.jurisdiction && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
                              {item.jurisdiction}
                            </span>
                          )}

                          {item.document_type && (
                            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600">
                              {item.document_type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {(!response.evidence || response.evidence.length === 0) && (
                  <p className="text-sm text-slate-500">
                    No evidence sources were returned.
                  </p>
                )}
              </div>
            </div>

            {/* CONFIDENCE EXPLANATION */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <div className="text-xl">ⓘ</div>

                <div>
                  <h4 className="font-semibold text-amber-900">
                    About evidence confidence
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    {response.confidence_note ||
                      "Evidence confidence indicates how strongly the retrieved sources match the question. It is not a measure of factual or legal certainty."}
                  </p>
                </div>
              </div>
            </div>

            {/* REVIEW NOTICE */}
            {response.human_review && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-xl">⚖️</div>

                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Expert review recommended
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      This assistant provides preliminary, evidence-backed
                      information. Patent, legal, regulatory or biodiversity
                      decisions should be verified with the appropriate expert
                      or authority.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* DISCLAIMER */}
            {response.disclaimer && (
              <p className="pb-8 text-center text-xs leading-5 text-slate-400">
                {response.disclaimer}
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}