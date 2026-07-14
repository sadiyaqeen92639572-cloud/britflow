import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini, SYSTEM_PROMPT } from "../../../lib/gemini";
import { generateExpansionInsight } from "../../../data/staticDatabase";


export async function POST(req: NextRequest) {
  const { currentRevenue, targetRevenue, strategy } = await req.json();

  const result = await generateWithGemini(
    SYSTEM_PROMPT,
    `Analyse de scaling de ${currentRevenue}€ vers ${targetRevenue}€. Note de stratégie : ${strategy}`
  );

  return NextResponse.json({
    result: result ?? generateExpansionInsight(currentRevenue, targetRevenue, strategy),
  });
}
