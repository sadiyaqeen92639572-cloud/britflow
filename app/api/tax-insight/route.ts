import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, SYSTEM_PROMPT } from "../../../lib/gemini";
import { generateTaxInsight } from "../../../data/staticDatabase";


export async function POST(req: NextRequest) {
  const { revenue, industry } = await req.json();

  const result = await generateWithGemini(
    SYSTEM_PROMPT,
    `Analyse la situation d'un entrepreneur français générant ${revenue}€/an dans le secteur ${industry}.
    Il souhaite créer une Limited à Londres pour optimiser ses flux.
    Fournis une analyse stratégique incluant la substance fiscale pour éviter la requalification par Bercy.`,
    0.7
  );

  return NextResponse.json({ result: result ?? generateTaxInsight(revenue, industry) });
}
