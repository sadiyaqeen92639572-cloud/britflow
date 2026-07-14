# FICHES TECHNIQUES - WIDGETS INTERACTIFS BRITFLOW

**Date de mise à jour :** Janvier 2025
**Version des widgets :** 1.0

---

## 1. FISCALWATCH

**Type :** Graphique linéaire interactif
**Objectif :** Visualiser la corrélation entre taux d'imposition et défaillances d'entreprises

### Fonctionnalités
- Graphique à double axe (pourcentages et nombres absolus)
- Période : 2019-2025 (données historiques + prévisions)
- Animation au survol des points de données
- Export en PNG

### Données Affichées
- **Axe gauche (pourcentage)** : Taux d'IS moyen (France vs UK)
- **Axe droit (nombre)** : Défaillances d'entreprises en France
- **Choc 2024** : 66 000 défaillances (+17,6%)

### Sources
- INSEE : Défaillances d'entreprises mensuelles
- HMRC : Corporate Tax statistics
- INSEE : Taux d'imposition des sociétés

### Spécifications Techniques
- Dimensions recommandées : 800x500px
- Temps de chargement : < 2s
- Responsive : Oui (mobile, tablette, desktop)
- Langue : Français

### Cas d'Usage
- Articles sur la fiscalité des entreprises
- Comparaisons France vs UK
- Analyses économiques

---

## 2. URSSAF TRACKER

**Type :** Carte interactive de la France
**Objectif :** Visualiser les montants de redressements URSSAF par région

### Fonctionnalités
- Carte SVG interactive des 13 régions françaises
- Gradient de couleurs (vert → rouge) selon montant
- Tooltip au survol avec détails :
  - Montant redressé
  - Nombre d'entreprises contrôlées
  - Évolution vs année précédente
- Filtre par année

### Données Affichées (2024)
- **Île-de-France** : 580M€ (+22%)
- **PACA** : 320M€ (+15%)
- **Auvergne-Rhône-Alpes** : 280M€ (+18%)
- **Hauts-de-France** : 190M€ (+12%)
- **Nouvelle-Aquitaine** : 175M€ (+14%)
- **Grand Est** : 165M€ (+16%)
- **Occitanie** : 155M€ (+19%)
- **Pays de la Loire** : 140M€ (+11%)
- **Bretagne** : 130M€ (+13%)
- **Normandie** : 125M€ (+15%)
- **Centre-Val de Loire** : 95M€ (+17%)
- **Bourgogne-Franche-Comté** : 85M€ (+14%)
- **Total France** : 2,4 milliards € (+18%)

### Sources
- URSSAF : Rapports annuels par région
- Acoss : Statistiques nationales

### Spécifications Techniques
- Dimensions recommandées : 800x600px
- Interactivité : Survol clic pour détails
- Responsive : Oui (adaptation mobile)

### Cas d'Usage
- Articles sur les contrôles URSSAF
- Analyses régionales de la pression fiscale
- Études sur les délocalisations

---

## 3. FISCAL EXODUS SIMULATOR

**Type :** Calculateur comparatif
**Objectif :** Comparer la fiscalité France vs UK selon le profil

### Fonctionnalités
- **Inputs** :
  - Chiffre d'affaires annuel
  - Bénéfice avant impôt
  - Salaire souhaité
  - Nombre d'employés
- **Outputs** :
  - Économie annuelle estimée
  - Répartition impôts France vs UK
  - Barre de progression animée
  - Détail des économies par poste (IS, salaire, TVA)
- **CTA WhatsApp** : Message pré-rempli avec résultats

### Formules de Calcul

**France (SASU) :**
```
IS = Bénéfice × 25%
Salaire_net = Salaire_brut × (1 - 22% cotisations)
IR = [Salaire_net + (Dividendes - 10% abattement)] × TSG
Total = IS + Salarié + IR
```

**UK (Limited) :**
```
Corporation Tax = Bénéfice × 19% (jusqu'à 50k£)
Salary_Net = Salary_brut × (1 - 13% NIC)
Dividend_Tax = Dividends × 8.75% (basic rate)
Total = CT + Salary + Dividend_Tax
```

### Hypothèses Fiscales 2025
- **IS France** : 25% (taux standard)
- **Corporation Tax UK** : 19% jusqu'à 50k£ de profit
- **Salaire** : Tranche marginale d'imposition moyenne 30%
- **Dividendes UK** : 8.75% (basic rate)
- **TVA** : Non inclus dans ce calcul (voir TVA Shock Simulator)

### Sources
- DGFiP : Barème impôt sur le revenu
- HMRC : Corporation Tax rates
- URSSAF : Taux de cotisations

### Spécifications Techniques
- Dimensions : 600x800px (vertical)
- Calcul en temps réel
- Responsive mobile-first

### Cas d'Usage
- Articles sur l'optimisation fiscale
- Comparaisons France vs UK
- Guides pour entrepreneurs

---

## 4. BUREAUCRACY CLOCK

**Type :** Comparateur visuel (horloge)
**Objectif :** Comparer les délais administratifs France vs UK

### Fonctionnalités
- **Double horloge** : France (rouge) vs UK (vert)
- **Étapes comparées** :
  1. Création de société
  2. Ouverture compte bancaire
  3. Immatriculation TVA
  4. Premier employé
  5. Déclaration fiscale annuelle
- Animation des aiguilles
- Indicateur de temps total (jours/heures)

### Données Affichées (moyennes 2024)

**France :**
- Création société : 16 jours (reality)
- Compte bancaire : 7 jours
- TVA : 21 jours
- Premier employé : 14 jours
- Déclaration fiscale : 120 jours (préparation)
- **Total : ~6 mois**

**UK :**
- Création société : 24h
- Compte bancaire : 48h
- TVA : 7 jours
- Premier employé : 24h
- Déclaration fiscale : 30 jours (préparation)
- **Total : ~2 semaines**

### Sources
- World Bank : Doing Business 2024
- Chambre de Commerce France
- Companies House UK
- Enquêtes utilisateurs BritFlow (n=500)

### Spécifications Techniques
- Dimensions : 600x400px
- Animation continue
- Format SVG vectoriel

### Cas d'Usage
- Articles sur l'administratif
- Comparaisons de facilité de faire des affaires
- Guides création d'entreprise

---

## 5. TVA SHOCK SIMULATOR

**Type :** Jauge interactive
**Objectif :** Visualiser l'impact financier du dépassement de seuil de franchise

### Fonctionnalités
- **Jauge animée** :
  - Vert (en dessous du seuil)
  - Orange (approche du seuil)
  - Rouge (dépassement)
- **Inputs** :
  - Chiffre d'affaires actuel
  - Croissance estimée
  - Pays (France/UK)
- **Outputs** :
  - Distance au seuil (€)
  - Montant de TVA à payer si dépassement
  - Économie en passant au UK (seuil 3x plus élevé)

### Seuils de Franchise de TVA (2025)

**France :**
- Franchise base : 36 800€
- Services : 36 800€
- Livraison biens : 91 400€ (régime particulier)

**UK :**
- Franchise : 90 000£ (~105 000€)
- Aucune distinction biens/services

### Calcul de l'Impact

**Scénario dépassement France :**
```
CA_actuel = 36 000€
Croissance = +10%
CA_projeté = 39 600€
Dépassement = 2 800€
TVA_due = 39 600€ × 20% = 7 920€
Pénalités retard = ~40% de TVA due = 3 168€
Coût_total = 11 088€
```

**Au UK (même CA) :**
```
CA_projeté = 39 600€ (~33 000£)
Seuil UK = 105 000€
Marge de sécurité = 65 400€
TVA_due = 0£ (en franchise)
```

### Sources
- DGFiP : Seuils de franchise de TVA
- HMRC : VAT threshold

### Spécifications Techniques
- Dimensions : 500x500px (carré)
- Animation fluide
- Responsive

### Cas d'Usage
- Articles sur la TVA
- Guides e-commerce
- Calculs de seuils

---

## 6. DIVIDEND OPTIMIZER

**Type :** Graphique circulaire (pie chart)
**Objectif :** Visualiser la répartition optimale salaire vs dividendes

### Fonctionnalités
- **Pie chart interactif** :
  - Part État (impôts)
  - Part Dirigeant (net)
- **Inputs** :
  - Bénéfice total
  - Salaire souhaité
  - Statut (SASU France / Limited UK)
- **Outputs** :
  - Montant optimal de salaire
  - Montant optimal de dividendes
  - Taux de prélèvement global
  - Comparaison France vs UK

### Stratégies d'Optimisation

**France (SASU) :**
```
Stratégie 1 - Salaire maximal :
- Salaire : 100% du bénéfice
- Cotisations : ~45%
- Net avant IR : 55%
- IR (30% TSG) : -16.5%
- Net final : 38.5%

Stratégie 2 - Mixte (recommandée) :
- Salaire : 40% (SMIC ou plus)
- Dividendes : 60%
- Cotisations : 45% sur salaire
- IR sur salaire : 30%
- Flat tax dividendes : 30%
- Net final : ~45%
```

**UK (Limited) :**
```
Stratégie 1 - Salary minimal :
- Salaire : 12 570£ (threshold NI)
- Dividendes : reste
- NIC : 13.25% sur salaire
- Income tax : 0% (personal allowance)
- Dividend tax : 8.75% (basic rate)
- CT : 19% sur profit
- Net final : ~72%

Stratégie 2 - Mix optimale :
- Salaire : 8 632£ (secondary threshold)
- Dividendes : jusqu'à 50 270£
- NIC : 0%
- Dividend tax : 0%
- Net final : ~78%
```

### Sources
- URSSAF : Taux de cotisations
- HMRC : National Insurance & Dividend Tax
- DGFiP : Flat tax prélèvements sociaux

### Spécifications Techniques
- Dimensions : 600x600px
- Légende interactive
- Export PNG

### Cas d'Usage
- Articles sur rémunération
- Optimisation fiscale dirigeant
- Comparaison statuts

---

## 7. PRIVACY SCORECARD

**Type :** Tableau de bord comparatif
**Objectif :** Comparer l'anonymat fiscal France vs UK

### Fonctionnalités
- **Score sur 100** par catégorie :
  - Échange automatique d'informations
  - Protection du patrimoine
  - Anonymat des bénéficiaires
  - Accès bancaire
  - Cryptographie
- **Visuel** :
  - Radar chart (5 axes)
  - Scores France (rouge) vs UK (vert)
- **Détails** :
  - Législation applicable
  - Conventions fiscales
  - CRC (Common Reporting Standard)

### Scores par Catégorie

**France :**
- Échange automatique : 20/100 (CRDS, DAC6)
- Protection patrimoine : 35/100
- Anonymat bénéficiaires : 15/100 (RBE public)
- Accès bancaire : 60/100
- Cryptographie : 40/100
- **Score global : 34/100**

**UK :**
- Échange automatique : 40/100 (FATCA, CRS)
- Protection patrimoine : 75/100 (trusts)
- Anonymat bénéficiaires : 60/100 (PSC privé)
- Accès bancaire : 85/100
- Cryptographie : 70/100
- **Score global : 66/100**

### Sources
- OCDE : Common Reporting Standard
- UE : Directive DAC6
- France : Registre Bénéficiaires Effectifs
- UK : PSC (Persons with Significant Control)

### Spécifications Techniques
- Dimensions : 700x500px
- Radar chart animé
- Responsive

### Cas d'Usage
- Articles sur la protection du patrimoine
- Comparaison confidentialité fiscale
- Guides anonymat

---

## 8. BANK MATCHMAKER

**Type :** Système de recommandation
**Objectif :** Identifier les banques UK adaptées au profil

### Fonctionnalités
- **Quiz de 8 questions** :
  1. Type d'activité (e-commerce, freelance, crypto, etc.)
  2. CA annuel
  3. Besoin de crypto
  4. Besoin de financement
  5. Résidence fiscale
  6. Nationalité
  7. Volume de transactions
  8. Besoins multi-devises
- **Recommandation** : Top 3 banques adaptées
- **Détails par banque** :
  - Frais d'ouverture
  - Délai d'ouverture
  - Frais mensuels
  - Crypto-friendly
  - Notes (/5)

### Banques Couvertes

**Neobanques :**
- Monzo (5/5 crypto, 0€ ouverture)
- Revolut (5/5 crypto, 0€ ouverture)
- Starling (4/5 crypto, 0€ ouverture)

**Banques Traditionnelles :**
- HSBC (2/5 crypto, 10£/mois)
- Barclays (1/5 crypto, 8£/mois)
- Lloyds (2/5 crypto, 7£/mois)

**Spécialisées Entrepreneurs :**
- Mettle (4/5, 0€ ouverture)
- Countingup (5/5, 0€ ouverture)
- Tide (4/5, 0€ ouverture)

### Critères de Scoring
- **Crypto-friendly** : Possibilité d'achat/vente BTC/ETH
- **Ouverture à distance** : 100% online
- **Frais** : Totaux mensuels
- **API** : Intégration comptabilité
- **Support** : Temps de réponse

### Sources
- Sites officiels des banques
- Enquêtes utilisateurs BritFlow (n=350)
- Which? (magazine consommateur UK)

### Spécifications Techniques
- Dimensions : 800x1000px (vertical)
- Quiz multi-étapes
- Résultats instantanés

### Cas d'Usage
- Guides installation UK
- Choix banque pro
- Articles crypto-friendly

---

## 9. LIQUIDATION COST CALCULATOR

**Type :** Calculateur de coûts
**Objectif :** Comparer les coûts de fermeture d'entreprise

### Fonctionnalités
- **Inputs** :
  - Type de société (SASU, EURL, Limited)
  - Durée d'activité
  - Montant du capital social
  - Existence de passif
  - Plus-value immobilière
- **Outputs** :
  - Coût total de fermeture
  - Détail des frais :
    - Frais de liquidation
    - Fiscalité sur plus-values
    - Honoraires comptables
    - Honoraires juridiques
  - Comparaison France vs UK
  - Délai de fermeture

### Coûts de Liquidation (2025)

**France (SASU) :**
```
Honoraires liquidateur : 1 500€ - 5 000€
Frais de publication : 200€ - 400€
Fiscalité plus-values :
  - Courte détention (<2 ans) : 30% (flat tax)
  - Longue détention (>2 ans) : 19% + 17.2% PS
Comptable : 800€ - 2 000€
Greffe : 50€
Délai moyen : 3-6 mois
```

**UK (Limited) :**
```
Honoraires liquidateur : 500£ - 2 000£
Frais de dissolution : 8£ (en ligne)
Fiscalité plus-values :
  - Entrepreneurs' Relief : 10% (jusqu'à 1M£)
  - Capital gains rate : 20% (au-delà)
Comptable : 200£ - 800£
Companies House : 8£
Délai moyen : 3-4 mois
```

### Scénario Exemple

**France - SASU avec 50k€ de capital :**
```
Plus-value : 50 000€
Détention : 3 ans (longue)
Flat tax : 50 000€ × 19% = 9 500€
PS : 50 000€ × 17.2% = 8 600€
Honoraires : 3 000€
Frais : 500€
Total : 21 600€ (43% du capital)
```

**UK - Limited avec 50k£ de capital :**
```
Plus-value : 50 000£
Entrepreneurs' Relief : 10%
Tax : 50 000£ × 10% = 5 000£
Honoraires : 1 000£
Frais : 8£
Total : 5 008£ (10% du capital)
```

### Sources
- Greffe de Paris : Frais de liquidation
- Companies House : Dissolution fees
- Ordonnance 2021-1190 : Montants liquidation

### Spécifications Techniques
- Dimensions : 700x900px
- Calculs temps réel
- Export PDF du rapport

### Cas d'Usage
- Articles sortie d'entreprise
- Comparaisons coûts fermeture
- Guides stratégie exit

---

## SPÉCIFICATIONS GÉNÉRALES

### Performance
- **Temps de chargement** : < 2s sur 4G
- **SEO** : Balises meta, Schema.org, Lazy loading
- **Accessibilité** : WCAG 2.1 AA compliant
- **Responsive** : Mobile-first (320px à 4K)

### Intégration Technique
- **Format** : Iframe responsive
- **Chargement** : Lazy loading recommandé
- **Attribution** : Backlink obligatoire vers https://britflow.co.uk

### Support Presse
Pour toute question technique ou demande de customisation :
- Email : press@britflow.co.uk
- Délai de réponse : 48h ouvrées

---

*V1.0 - Janvier 2025*
