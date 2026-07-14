export interface ToolMeta {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  color: string;
  tag: string;
}

// Ported from the old services/seoManager.ts toolMetadata map (client-injected
// titles/descriptions) — now the source for generateMetadata on each /outils/[tool] page.
// emoji/color/tag ported from the home tools-grid cards in the old App.tsx.
export const TOOLS: ToolMeta[] = [
  { id: "substance-audit", title: "Audit de Substance Économique IA", desc: "Prouvez la réalité de votre structure à Londres face à l'administration fiscale française.", emoji: "🛡️", color: "emerald", tag: "Mode Contrôle Fiscal" },
  { id: "fiscal-scanner", title: "Scanner de Risque Fiscal FR-UK", desc: "Évaluez votre vulnérabilité fiscale et identifiez les leviers d'optimisation via Londres.", emoji: "📊", color: "blue", tag: "Mode Train de Vie (ESFP)" },
  { id: "panic-vault", title: "Panic Vault : Terminal d'Urgence SOS", desc: "18 solutions immédiates pour protéger vos actifs en cas de crise majeure.", emoji: "🚨", color: "red", tag: "Urgence Critique" },
  { id: "director-protection", title: "Protection du Dirigeant & Divorce", desc: "Rendez vos parts sociales insaisissables et protégez votre capital des tiers.", emoji: "👔", color: "purple", tag: "4 Modes Spécialisés" },
  { id: "rebound-vault", title: "Rebond après Liquidation & FIBEN", desc: "Relancez votre activité via Londres après une faillite ou un fichage bancaire.", emoji: "🔄", color: "orange", tag: "Mode FIBEN & Liability" },
  { id: "sci-shield", title: "Bouclier SCI & Patrimoine", desc: "Rendez votre patrimoine immobilier insaisissable face aux créanciers pro.", emoji: "🏠", color: "teal", tag: "Anti-URSSAF" },
  { id: "banking-shield", title: "Bouclier Bancaire International", desc: "Protégez votre trésorerie des saisies (ATD) grâce à la Common Law britannique.", emoji: "🏦", color: "indigo", tag: "Mode ATD Urgence" },
  { id: "wealth-audit", title: "Audit Patrimonial & Succession", desc: "Transmettez votre héritage sans subir les 45% de droits de succession français.", emoji: "💎", color: "yellow", tag: "Mode Crypto" },
  { id: "simulator", title: "Simulateur SASU vs Limited UK", desc: "Comparez le net disponible réel après IS et charges sociales entre FR et UK.", emoji: "🧮", color: "cyan", tag: "Gain Net Réel" },
  { id: "optimization", title: "Optimiseur de Marges & Royalties", desc: "Arbitrez vos bénéfices entre la France (25%) et le Royaume-Uni (19%) légalement.", emoji: "⚡", color: "green", tag: "Management Fees" },
  { id: "salary-optimizer", title: "Optimiseur Mix Salaire/Dividendes", desc: "Maximisez votre net personnel en arbitrant entre rémunération UK et dividendes.", emoji: "💰", color: "pink", tag: "Maximiser le Net" },
  { id: "are-survival", title: "Simulateur de Sortie URSSAF", desc: "Calculez comment capitaliser vos profits sans subir le matraquage social français.", emoji: "🎯", color: "lime", tag: "Pôle Emploi" },
  { id: "expansion-hub", title: "Hub d'Expansion Internationale", desc: "Propulsez votre agence ou startup à l'international via le hub londonien.", emoji: "🚀", color: "violet", tag: "USA, Asie, VC" },
  { id: "nomad-scanner", title: "Scanner Nomade Digital", desc: "Vérifiez votre résidence fiscale et gérez l'Exit Tax avant votre expatriation.", emoji: "✈️", color: "amber", tag: "Exit Tax" },
];

export function getToolById(id: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.id === id);
}
