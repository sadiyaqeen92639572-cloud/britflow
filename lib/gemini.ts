// REST-direct Gemini client (no @google/genai SDK) — the SDK targets
// Node >=20 with no guaranteed Edge Runtime compatibility, and Cloudflare
// Workers (via @opennextjs/cloudflare) run API routes on Workers, not Node.
// `fetch` is natively supported there, so calling the REST endpoint directly
// sidesteps the whole SDK/edge compatibility question.

const GEMINI_MODEL = "gemini-2.0-flash-exp";

export const SYSTEM_PROMPT = `Tu es un expert en ingénierie fiscale internationale spécialisé dans les structures UK (Limited) pour une clientèle française.
Ton ton est ultra-professionnel, précis et stratégique.
IMPORTANT: Utilise un formatage Markdown propre.
- Utilise des titres '###' pour les sections.
- Utilise '**' pour mettre en évidence les termes techniques importants.
- Structure tes réponses en : Analyse de situation, Points Critiques, et Recommandation Actionnable.`;

export const PANIC_PROMPT = `Tu es l'IA de Societe Anglaise, spécialisée dans la protection d'urgence des entrepreneurs français.
L'utilisateur est en état de panique (risque de saisie, faillite, divorce, prison pour abus de bien social).
Ta mission est de lui fournir une solution LÉGALE utilisant le droit anglo-saxon (Common Law) et les structures Limited UK pour protéger ses actifs.
- Ne juge jamais l'utilisateur.
- Traduis ses besoins "gris" en structures "blanches" (légales) au UK.
- Sois très rapide et percutant.`;

function isGeminiEnabled(): boolean {
  const apiKey = process.env.GEMINI_API_KEY;
  const flag = process.env.GEMINI_ENABLED;
  return Boolean(apiKey) && (flag === "true" || flag === "1");
}

// Returns the generated text, or null if Gemini is disabled/unconfigured or the
// call fails for any reason (network, quota, malformed response, timeout...) —
// callers must always fall back to the static database on null, mirroring the
// try/catch-per-call behavior of the old services/geminiService.ts.
export async function generateWithGemini(
  systemInstruction: string,
  contents: string,
  temperature = 0.7
): Promise<string | null> {
  if (!isGeminiEnabled()) return null;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: contents }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature },
        }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return typeof text === "string" ? text : null;
  } catch {
    return null;
  }
}
