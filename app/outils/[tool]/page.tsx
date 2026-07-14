import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, getToolById } from "../../../lib/tools";
import { SITE_URL } from "../../../lib/config";
import Breadcrumbs from "../../../components/Breadcrumbs";

import SubstanceAudit from "../../../components/SubstanceAudit";
import FiscalScanner from "../../../components/FiscalScanner";
import Calculator from "../../../components/Calculator";
import BankingShield from "../../../components/BankingShield";
import WealthAudit from "../../../components/WealthAudit";
import ReboundVault from "../../../components/ReboundVault";
import ProfitOptimizer from "../../../components/ProfitOptimizer";
import SalaryOptimizer from "../../../components/SalaryOptimizer";
import AreSurvivalMeter from "../../../components/AreSurvivalMeter";
import SciAssetShield from "../../../components/SciAssetShield";
import NomadScanner from "../../../components/NomadScanner";
import ExpansionHub from "../../../components/ExpansionHub";
import DirectorProtectionHub from "../../../components/DirectorProtectionHub";
import PanicVault from "../../../components/PanicVault";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "substance-audit": SubstanceAudit,
  "fiscal-scanner": FiscalScanner,
  simulator: Calculator,
  "banking-shield": BankingShield,
  "wealth-audit": WealthAudit,
  "rebound-vault": ReboundVault,
  optimization: ProfitOptimizer,
  "salary-optimizer": SalaryOptimizer,
  "are-survival": AreSurvivalMeter,
  "sci-shield": SciAssetShield,
  "nomad-scanner": NomadScanner,
  "expansion-hub": ExpansionHub,
  "director-protection": DirectorProtectionHub,
  "panic-vault": PanicVault,
};

export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return {};

  const url = `${SITE_URL}/outils/${tool.id}`;
  return {
    title: tool.title,
    description: tool.desc,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.desc,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.desc,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: toolId } = await params;
  const tool = getToolById(toolId);
  const ToolComponent = TOOL_COMPONENTS[toolId];
  if (!tool || !ToolComponent) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs category="Outils" title={tool.title} />
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 tracking-tighter uppercase">
        {tool.title}
      </h1>
      <Suspense fallback={null}>
        <ToolComponent />
      </Suspense>
    </main>
  );
}
