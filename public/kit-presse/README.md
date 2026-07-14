# Kit Presse BritFlow - Instructions PDF

## 📋 Contenu du Kit Presse

Ce dossier contient tous les documents du kit presse BritFlow au format Markdown (.md) :

1. **DOSSIER_PRESSE.md** - Communiqué de presse complet avec chiffres clés 2024-2025
2. **FICHES_TECHNIQUES.md** - Spécifications détaillées des 9 widgets interactifs
3. **INFOS_GRAPHIQUES.md** - Spécifications des 6 infographies (dimensions, sources, formats)
4. **CODE_INTEGRATION.md** - Codes d'intégration iframe pour tous les widgets
5. **CONTACTS.md** - Contacts presse, ressources visuelles, droits à l'image

## 🖨️ Génération des PDFs

### Option 1 : Pandoc (Recommandé)

**Installer Pandoc :**

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y pandoc texlive-xetex texlive-fonts-recommended texlive-lang-french

# macOS
brew install pandoc basictex

# Vérifier l'installation
pandoc --version
```

**Générer tous les PDFs :**

```bash
cd /media/brice/TradingData/renovmatch/britflow/kit-presse

# Convertir tous les fichiers markdown en PDF
for file in *.md; do
  pandoc "$file" -o "${file%.md}.pdf" --pdf-engine=xelatex -V mainfont="DejaVu Sans"
done
```

### Option 2 : Node.js (markdown-pdf)

**Installer le package :**

```bash
npm install -g markdown-pdf
```

**Générer les PDFs :**

```bash
cd /media/brice/TradingData/renovmatch/britflow/kit-presse

# Convertir un fichier
markdown-pdf DOSSIER_PRESSE.md

# Convertir tous les fichiers
for file in *.md; do
  markdown-pdf "$file"
done
```

### Option 3 : Script Automatique

**Utiliser le script fourni :**

```bash
cd /media/brice/TradingData/renovmatch/britflow/kit-presse

# Rendre exécutable
chmod +x convert-to-pdf.js

# Exécuter (après avoir installé pandoc ou markdown-pdf)
node convert-to-pdf.js
```

## 📊 Aperçu des Documents

### DOSSIER_PRESSE.pdf (4 pages)
- Communiqué de presse officiel
- Chiffres clés 2024-2025
- 3 raisons de l'exode fiscal
- Citations presse
- Méthodologie

### FICHES_TECHNIQUES.pdf (12 pages)
- 9 fiches détaillées (1 par outil)
- Spécifications techniques
- Sources de données
- Cas d'usage

### INFOS_GRAPHIQUES.pdf (8 pages)
- 6 infographies décrites
- Spécifications visuelles
- Charte graphique
- Formats disponibles

### CODE_INTEGRATION.pdf (6 pages)
- Codes d'intégration iframe
- Conditions d'utilisation
- Bonnes pratiques
- FAQ

### CONTACTS.pdf (4 pages)
- Équipe presse
- Disponibilités interview
- Ressources visuelles
- Contacts urgences

## 🚀 Utilisation Rapide

### Générer tous les PDFs en une commande

```bash
# Avec pandoc installé
cd kit-presse && for f in *.md; do pandoc "$f" -o "${f%.md}.pdf" --pdf-engine=xelatex -V mainfont="DejaVu Sans"; done
```

### Vérifier les PDFs générés

```bash
ls -lh *.pdf
```

Vous devriez voir :
- DOSSIER_PRESSE.pdf
- FICHES_TECHNIQUES.pdf
- INFOS_GRAPHIQUES.pdf
- CODE_INTEGRATION.pdf
- CONTACTS.pdf

## 📤 Distribution

### Par Email
Joindre les PDFs à un email avec le sujet :
```
"Kit Presse BritFlow - Observatoire de l'Exode Fiscal 2025"
```

### Via WeTransfer
- Créer un dossier "Kit_Presse_BritFlow"
- Y placer tous les PDFs + infographies
- Partager le lien

### Téléchargement Direct (Recommandé)
Héberger les fichiers sur :
- https://britflow.co.uk/kit-presse/
- Google Drive
- Dropbox

## 📝 Notes Importantes

### Langue
Les documents sont en **français** avec support des caractères accentués (UTF-8).

### Mise en page
Les PDFs générés utilisent une mise en page standard :
- Police : DejaVu Sans (ou Times New Roman)
- Taille : A4
- Marges : Standard

### Customisation
Pour modifier la mise en page avec pandoc :

```bash
# Avec en-têtes et pieds de page
pandoc DOSSIER_PRESSE.md -o DOSSIER_PRESSE.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=12pt \
  -V colorlinks=true

# Avec table des matières
pandoc FICHES_TECHNIQUES.md -o FICHES_TECHNIQUES.pdf \
  --pdf-engine=xelatex \
  --toc \
  -V toc-title="Sommaire"
```

## 🆘 Support

**Problèmes de conversion ?**

1. **Erreur : "pandoc not found"**
   - Solution : Installer pandoc (voir Option 1)

2. **Erreur : "xelatex not found"**
   - Solution : `sudo apt-get install texlive-xetex`

3. **Problèmes de caractères accentués**
   - Solution : Utiliser `-V mainfont="DejaVu Sans"` avec xelatex

4. **Fichiers PDF vides ou corrompus**
   - Solution : Vérifier que les fichiers .md sont valides et encodés en UTF-8

**Contact technique :**
- Email : tech@britflow.co.uk
- Documentation : https://pandoc.org/MANUAL.html

## ✅ Checklist Avant Envoi

- [ ] Tous les 5 PDFs sont générés
- [ ] Les PDFs s'ouvrent correctement
- [ ] L'aspect visuel est satisfaisant
- [ ] Les liens dans les PDFs fonctionnent
- [ ] La mise en page est correcte (pas de coupures de texte)
- [ ] Les images/logo sont inclus (si applicable)

## 📦 Compression Optionnelle

Pour réduire la taille des PDFs pour l'envoi par email :

```bash
# Installer Ghostscript
sudo apt-get install ghostscript

# Compresser un PDF
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=DOSSIER_PRESSE_compressed.pdf \
   DOSSIER_PRESSE.pdf

# Compresser tous les PDFs
for file in *.pdf; do
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
     -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
     -sOutputFile="compressed_$file" "$file"
done
```

---

*Dernière mise à jour : Janvier 2025*
