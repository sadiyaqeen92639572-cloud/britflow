# 📦 Kit Presse Societe Anglaise - Index

**Version :** 1.0
**Date :** Janvier 2025
**Contact :** press@britflow.co.uk

---

## 📋 Contenu du Kit Presse

### 📄 Documents Principaux

| Fichier | Description | Format |
|---------|-------------|--------|
| **DOSSIER_PRESSE** | Communiqué de presse officiel avec chiffres clés, citations, témoignages | Markdown, HTML |
| **FICHES_TECHNIQUES** | Spécifications détaillées des 9 widgets interactifs | Markdown |
| **INFOS_GRAPHIQUES** | Spécifications des 6 infographies (design, données, formats) | Markdown |
| **CODE_INTEGRATION** | Codes d'intégration iframe pour tous les widgets | Markdown |
| **CONTACTS** | Équipe presse, interviews, ressources visuelles, droits | Markdown |
| **README** | Instructions pour générer les PDFs | Markdown |

### 🛠️ Outils de Conversion

| Fichier | Description |
|---------|-------------|
| **convert-to-pdf.js** | Script Node.js pour convertir Markdown en PDF |
| **INDEX.md** | Ce fichier - Index du kit presse |

---

## 🚀 Utilisation Rapide

### Option 1 : HTML vers PDF (Recommandé - Le Plus Simple)

**Étapes :**

1. Ouvrir le fichier HTML dans un navigateur :
   ```bash
   firefox kit-presse/DOSSIER_PRESSE.html
   # ou
   google-chrome kit-presse/DOSSIER_PRESSE.html
   # ou double-cliquez sur le fichier
   ```

2. Cliquer sur le bouton "🖨️ Imprimer en PDF" (en haut à droite)

3. Choisir "Enregistrer au format PDF" comme destination

4. Cliquer sur "Enregistrer"

**Avantages :**
- ✅ Aucune installation requise
- ✅ Mise en page professionnelle
- � Fonctionne sur tous les navigateurs modernes

### Option 2 : Pandoc (Recommandé - Qualité Professionnelle)

**Installer Pandoc :**
```bash
# Ubuntu/Debian
sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended texlive-lang-french

# macOS
brew install pandoc basictex
```

**Générer les PDFs :**
```bash
cd kit-presse

# Convertir tous les fichiers
for file in *.md; do
  pandoc "$file" -o "${file%.md}.pdf" --pdf-engine=xelatex -V mainfont="DejaVu Sans"
done
```

### Option 3 : En Ligne (Alternative)

Utiliser un convertisseur Markdown vers PDF en ligne :
- https://www.markdowntopdf.com/
- https://dillinger.io/ (export PDF)

---

## 📊 Résumé du Dossier de Presse

### Communiqué de Presse

**Titre :** "Exode Fiscal 2025 : Les Entrepreneurs Français Quittent la France en Masse"

**Chiffres Clés :**
- **66 000** défaillances d'entreprises en France en 2024 (+17,6%)
- **2,4 milliards €** de redressements URSSAF (+18%)
- **+340%** de créations de Limited par des Français (2020-2024)
- **15 000€** d'économie moyenne annuelle

**3 Raisons de l'Exode :**
1. Pression fiscale écrasante (IS 25% vs 19%, TVA 36k€ vs 105k€)
2. Inquisition administrative (16 jours vs 24h pour création)
3. Liberté entrepreneuriale (pas de plafond CA)

**9 Outils Interactifs Disponibles :**
1. FiscalWatch
2. URSSAF Tracker
3. Fiscal Exodus Simulator
4. Bureaucracy Clock
5. TVA Shock Simulator
6. Dividend Optimizer
7. Privacy Scorecard
8. Bank Matchmaker
9. Liquidation Cost Calculator

---

## 📝 Changelog

**v1.0 - 25 Janvier 2025**
- ✅ Création du dossier de presse complet
- ✅ Fiches techniques des 9 widgets
- ✅ Spécifications des infographies
- ✅ Codes d'intégration
- ✅ Contacts presse
- ✅ HTML pour impression PDF
- ✅ Script de conversion

---

## 📤 Checklist Envoi Presse

### Avant l'envoi :
- [ ] Générer les PDFs (HTML → PDF ou Pandoc)
- [ ] Vérifier l'ouverture correcte des PDFs
- [ ] Vérifier la mise en page (pas de coupures)
- [ ] Vérifier que tous les liens fonctionnent

### Email type :
```
Objet : Kit Presse - Societe Anglaise Observatoire de l'Exode Fiscal 2025

Bonjour [Nom du journaliste],

Je vous prie de trouver ci-joint notre kit presse complet
sur l'Observatoire de l'Exode Fiscal 2025.

Ce dossier contient :
- Notre communiqué de presse officiel
- Les chiffres clés 2024-2025
- Les spécifications de nos 9 widgets interactifs
- Les codes d'intégration pour vos articles
- Nos coordonnées presse

Les widgets sont gratuits et librement intégrables sur vos
articles et blogs (avec attribution obligatoire).

N'hésitez pas à nous contacter pour toute question ou
demande d'interview.

Cordialement,

[Votre Nom]
Societe Anglaise
press@britflow.co.uk
+44 77 1234 5678
https://britflow.co.uk#observatoire
```

---

## 🔗 Ressources en Ligne

- **Site principal** : https://britflow.co.uk
- **Observatoire** : https://britflow.co.uk#observatoire
- **Blog** : https://britflow.co.uk#blog
- **Outils** : https://britflow.co.uk#tools

---

## 📞 Support Presse

**Questions techniques ou demandes d'information :**
- Email : press@britflow.co.uk
- WhatsApp : +44 77 1234 5678
- Réponse sous 48h ouvrées

---

*Kit Presse Societe Anglaise v1.0 - Janvier 2025*
