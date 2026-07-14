
// Ce fichier remplace les appels Gemini par une base de données statique DYNAMIQUE.
// Il simule une intelligence artificielle en assemblant des fragments de réponses contextuelles.

// --- CONFIGURATION DU GÉNÉRATEUR OFF-LINE ---

const TEMPLATES = {
    openings: [
        "Après analyse de votre profil,",
        "Sur la base des données fournies,",
        "L'examen préliminaire de votre situation indique que",
        "D'un point de vue purement fiscal, il apparaît que",
        "Notre algorithme a détecté plusieurs opportunités :"
    ],
    risk_high: [
        "⚠️ Votre exposition est CRITIQUE.",
        "⚠️ ALERTE ROUGE : Situation à haut risque.",
        "⚠️ Vos indicateurs sont en zone de danger.",
        "⚠️ Attention : Configuration instable détectée."
    ],
    risk_med: [
        "⚠️ Votre situation mérite une vigilance accrue.",
        "⚠️ Risque modéré détecté, correction recommandée.",
        "⚠️ Configuration sous-optimale.",
        "⚠️ Point d'attention : Optimisation nécessaire."
    ],
    risk_low: [
        "✅ Votre situation semble saine.",
        "✅ Configuration stable et conforme.",
        "✅ Indicateurs au vert.",
        "✅ Bonne gestion détectée."
    ],
    conclusions: [
        "Une action immédiate est conseillée pour sécuriser ces gains.",
        "Ne laissez pas cette situation se dégrader.",
        "Considérez une restructuration via une Limited UK pour pérenniser votre activité.",
        "L'arbitrage France/UK est clairement en votre faveur ici."
    ]
};

const INDUSTRY_TIPS: Record<string, string> = {
    "Tech": "💡 **Conseil Tech :** En localisant votre propriété intellectuelle (Code, SaaS) au UK, vous pourriez bénéficier du régime 'Patent Box' (IS réduit à 10%).",
    "Consulting": "💡 **Conseil Consulting :** Vos frais de déplacement et de représentation sont plus facilement déductibles au UK (pas de TVS sur les véhicules de direction).",
    "E-commerce": "💡 **Conseil E-com :** Le seuil de TVA UK est à £90k (~105k€) contre 36k€ en France. Une marge de manœuvre vitale pour votre cash-flow.",
    "BTP": "💡 **Conseil BTP :** Attention à la sous-traitance. Une structure UK peut sécuriser vos actifs personnels en cas de décennale défaillante en France.",
    "Finance": "💡 **Conseil Finance :** Les gains de change et les produits financiers sont souvent exonérés de taxes locales au UK sous certaines conditions.",
    "Autre": "💡 **Conseil Pro :** La flexibilité du droit du travail anglais vous permet d'embaucher et de séparer vos collaborateurs sans risque prud'homal majeur."
};

// --- GÉNÉRATEURS DYNAMIQUES ---

export const generateTaxInsight = (revenue: number, industry: string): string => {
    // 1. Calculs
    const isFr = revenue * 0.25; // approx IS France
    const isUk = revenue * 0.19; // approx IS UK
    const savings = isFr - isUk;
    const opening = TEMPLATES.openings[Math.floor(Math.random() * TEMPLATES.openings.length)];
    const tip = INDUSTRY_TIPS[industry] || INDUSTRY_TIPS["Autre"];

    // 2. Construction
    return `
### Analyse Fiscale : Secteur ${industry}

${opening} une structure française classique (SASU/EURL) pénalise votre croissance avec un taux d'IS réel proche de 25%.

**Chiffres Clés de votre Simulation :**
*   **IS Estimé France :** ~${isFr.toLocaleString()}€
*   **IS Estimé UK (Limited) :** ~${isUk.toLocaleString()}€
*   **Économie Potentielle :** **${savings.toLocaleString()}€ / an**

**Analyse Sectorielle (${industry}) :**
${tip}

**Stratégie Recommandée :**
Créez une **Limited UK** pour facturer vos clients. Vous conservez votre résidence fiscale en France mais logez les profits de l'entreprise dans une juridiction à 19%.
    `;
};

export const generateSubstanceAudit = (answers: string[]): string => {
    const riskCount = answers.filter(a => a.toLowerCase().includes('non')).length;
    let verdictTemplate = TEMPLATES.risk_low;
    let color = "🟢";

    if (riskCount >= 2) {
        verdictTemplate = TEMPLATES.risk_high;
        color = "🔴";
    } else if (riskCount > 0) {
        verdictTemplate = TEMPLATES.risk_med;
        color = "🟠";
    }

    const verdict = verdictTemplate[Math.floor(Math.random() * verdictTemplate.length)];

    // Analyse spécifique des manques
    let todoList = "";
    if (answers.some(a => a.includes("bureau") && a.toLowerCase().includes('non'))) todoList += "- 🏢 **Urgent :** Louez un bureau ou un coworking à Londres (pas une boîte postale).\n";
    if (answers.some(a => a.includes("directeur") && a.toLowerCase().includes('non'))) todoList += "- 👤 **Conseil :** Nommez un directeur local ou prouvez vos déplacements réguliers (Eurostar).\n";
    if (answers.some(a => a.includes("réunions") && a.toLowerCase().includes('non'))) todoList += "- 📅 **Action :** Tenez vos Assemblées Générales physiquement au UK au moins 2x/an.\n";
    if (answers.some(a => a.includes("bancaire") && a.toLowerCase().includes('non'))) todoList += "- 🏦 **Priorité :** Ouvrez un compte chez Wise Business ou Tide UK immédiatement.\n";

    if (todoList === "") todoList = "- Maintenez vos preuves de présence à jour (billets d'avion, factures locales).\n";

    return `
### Verdict Substance : ${color} ${riskCount > 1 ? "RISQUE ÉLEVÉ" : "CONFORME"}

**Diagnostic IA :**
${verdict}
Vous présentez **${riskCount} point(s) de fragilité** vis-à-vis de l'administration fiscale.

**Plan d'Action Correctif :**
${todoList}

**Conclusion Juridique :**
Sans ces correctifs, votre structure risque la requalification en "Établissement Stable en France" (Art. 209-I CGI). Agissez maintenant.
    `;
};

export const PANIC_SCENARIOS = {
    urssaf: {
        title: "🛡️ Bouclier Anti-URSSAF",
        text: "L'URSSAF n'a aucun pouvoir de saisie sur un compte bancaire britannique détenu par une Limited. Vos fonds professionnels sont hors de portée des ATD français. **Action :** Basculez votre facturation sur la Limited immédiatement."
    },
    saisie: {
        title: "🔒 Protection des Actifs",
        text: "Un huissier français ne peut pas saisir les parts d'une société anglaise sans une procédure d'exequatur (longue et coûteuse). En logeant vos actifs dans la Limited, vous créez un 'firewall' juridique efficace."
    },
    divorce: {
        title: "💔 Protection Patrimoniale",
        text: "Les parts de Limited acquises via des fonds propres ou post-séparation peuvent être isolées du patrimoine commun. La Common Law anglaise offre des outils (Trusts) pour sanctuariser le capital."
    },
    defaut: {
        title: "⚖️ Analyse Juridique Standard",
        text: "Votre situation nécessite une structure écran. La Limited UK offre l'anonymat (via le Director Service) et la protection contre les créanciers personnels. C'est la solution standard pour rebondir."
    }
};

export const generateEmergencySolution = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    let scan = PANIC_SCENARIOS.defaut;

    if (lowerQuery.includes('urssaf') || lowerQuery.includes('rsi') || lowerQuery.includes('charge')) scan = PANIC_SCENARIOS.urssaf;
    else if (lowerQuery.includes('saisie') || lowerQuery.includes('huissier') || lowerQuery.includes('dette')) scan = PANIC_SCENARIOS.saisie;
    else if (lowerQuery.includes('divorce') || lowerQuery.includes('ex') || lowerQuery.includes('femme') || lowerQuery.includes('mari')) scan = PANIC_SCENARIOS.divorce;

    return `
### ${scan.title}

**Analyse de la Menace :**
${scan.text}

**Protocole d'Urgence :**
1. **Ouvrez une Limited** (24h) pour créer une nouvelle personne morale.
2. **Ouvrez un compte Fintech UK** (Wise/Revolut) pour sécuriser le cash-flow entrant.
3. **Ne laissez rien** sur vos comptes français personnels saisissables.

*Ceci est une information juridique à but éducatif, consultez un avocat pour la mise en œuvre.*
    `;
};


export const generateExpansionInsight = (current: number, target: number, strategy: string): string => {
    const delta = target - current;
    const isExpon = target > current * 2;
    const opening = TEMPLATES.openings[Math.floor(Math.random() * TEMPLATES.openings.length)];

    let strategyText = "";
    if (strategy.includes("USA")) strategyText = "🇺🇸 **Focus USA :** La Limited UK permet d'accéder au marché américain sans la lourdeur administrative d'une Delaware C-Corp initiale, grâce au traité fiscal UK-US.";
    else if (strategy.includes("Asie")) strategyText = "🌏 **Focus Asie :** Hong-Kong et Singapour reconnaissent parfaitement la Common Law anglaise, facilitant les contrats.";
    else if (strategy.includes("VC")) strategyText = "🦄 **Focus VC :** Les investisseurs préfèrent investir dans une Topco UK plutôt que française (BSO gratuits via EMI vs BSPCE complexes).";
    else strategyText = "🚀 **Stratégie Générale :** Le Royaume-Uni est votre tremplin pour l'international.";

    const conclusion = isExpon
        ? "Votre ambition d'hyper-croissance (x" + Math.round(target / current) + ") nécessite une structure flexible."
        : "Votre croissance organique sera fluidifiée par l'absence de charges sociales patronales sur votre mandat.";

    return `
### Trajectoire de Scaling : ${current.toLocaleString()}€ ➜ ${target.toLocaleString()}€

${opening} pour atteindre votre objectif de **+${delta.toLocaleString()}€**, la structure juridique actuelle risque de consommer 45% de votre marge brute en friction administrative.

**Analyse du Levier Scaling :**
${strategyText}

**Impact Financier :**
En réinvestissant vos profits 'Pre-Tax' (avant impôt personnel), vous accélérez votre trésorerie disponible.

**Conseil IA :**
${conclusion}
    `;
};


export const generateBankingAudit = (cash: number, bankType: string, atd: string): string => {
    const isVulnerable = atd === 'Oui' || bankType.includes('Française');
    const opening = TEMPLATES.openings[Math.floor(Math.random() * TEMPLATES.openings.length)];
    const riskLevel = atd === 'Oui' ? "CRITIQUE" : bankType.includes('Française') ? "MODÉRÉ" : "FAIBLE";

    let advice = "";
    if (atd === 'Oui') advice = "🚨 **Action Immédiate :** Votre exposition aux ATD est maximale. Ouvrez un compte EMI (Wise/Revolut) ce jour pour ségréguer vos fonds vitaux.";
    else if (bankType.includes('Française')) advice = `⚠️ **Vigilance :** Avec ${cash.toLocaleString()}€ en banque traditionnelle, vous êtes sujet aux saisies administratives sans préavis. Diversifiez 40% sur une néo-banque UK.`;
    else advice = "✅ **Sécurité :** Votre usage d'une néo-banque réduit le risque de friction. Continuez ainsi.";

    return `
### Audit Résilience Bancaire : ${riskLevel}

${opening} la structure de votre trésorerie (${cash.toLocaleString()}€) présente un profil de risque **${riskLevel}**.

**Analyse de la Juridiction :**
${bankType.includes('Française') ? "Votre banque est soumise à l'obligation de collaboration immédiate avec le fisc français (ATD Automatisé)." : "Votre établissement offre une meilleure étanchéité face aux procédures locales."}

**Recommandation IA :**
${advice}
    `;
};

// --- ANCIENS EXPORTS (Compatibilité) ---
export const BANKING_SCENARIOS = {
    vulnerable: "CRITIQUE : Exposition maximale. Recommandation : Compte EMI UK immédiat.",
    moderate: "ATTENTION : Risque modéré. Recommandation : Diversification 40% UK.",
    safe: "OPTIMAL : Configuration sécurisée."
};


export const EXPANSION_SCENARIOS = {
    scaling: (revenue: number, target: number) => generateExpansionInsight(revenue, target, "Général"),
    optimization: "Structure stable. Optimisation possible via Management Fees.",
};
