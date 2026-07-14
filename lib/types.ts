
export interface ComparisonResult {
  label: string;
  france: number;
  uk: number;
}

export interface TaxScenario {
  revenue: number;
  expenses: number;
  dividendPercent: number;
}

export interface SEOKeyword {
  keyword: string;
  intent: string;
  difficulty: string;
}

export interface WealthAuditResult {
  freedomScore: number;
  leakageAmount: number;
  adminTimeCost: number;
  protectionLevel: "Critique" | "Vulnérable" | "Sécurisé";
}

export interface FlowOptimizationResult {
  taxSaved: number;
  netGain: number;
  riskLevel: "Faible" | "Modéré" | "Élevé";
}

export interface BankingRiskResult {
  shieldLevel: number;
  atdResistance: "Nulle" | "Modérée" | "Maximale";
  recommendation: string;
}

export interface ExpansionResult {
  scalingEfficiency: number;
  globalReachScore: number;
  hiringAdvantage: number;
}
