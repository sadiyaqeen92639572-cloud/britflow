# CODE D'INTÉGRATION DES WIDGETS

**Version :** 1.0
**Date :** Janvier 2025
**Support :** press@britflow.co.uk

---

## CONDITIONS GÉNÉRALES D'UTILISATION

### Licence Libre pour Presse
Tous les widgets Societe Anglaise sont **gratuits** pour un usage éditorial (presse, blogs, médias en ligne) sous conditions :

✅ **Autorisé :**
- Intégration sur des sites d'information, blogs, médias
- Modification des dimensions (width/height)
- Usage en France et à l'international

❌ **Interdit :**
- Modification du code source (sauf dimensions)
- Suppression du lien retour vers Societe Anglaise
- Usage commercial (vente, intégration payante)
- Redistribution en tant que service

### Attribution Obligatoire
Chaque widget contient un **lien retour hardcodé** vers https://britflow.co.uk. Ce lien ne peut être retiré.

### Support Technique
Pour toute question d'intégration : press@britflow.co.uk (réponse sous 48h ouvrées)

---

## WIDGET 1 : FISCALWATCH

**Description :** Graphique linéaire interactif - Défaillances vs Taux d'imposition (2019-2025)

**Dimensions recommandées :** 800x500px

**Code d'intégration :**

```html
<!-- Societe Anglaise FiscalWatch Widget - Start -->
<div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/fiscal-watch"
    width="100%"
    height="500"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise FiscalWatch - Défaillances d'entreprises vs Fiscalité"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Source: <a href="https://britflow.co.uk?ref=widget-fiscalwatch" style="color: #10b981; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Données INSEE & HMRC
  </div>
</div>
<!-- Societe Anglaise FiscalWatch Widget - End -->
```

**Variante compacte (mobile) :**
```html
<iframe src="https://britflow.co.uk#embed/fiscal-watch" width="100%" height="350" frameborder="0" loading="lazy"></iframe>
```

**Personnalisation autorisée :**
- `width`: 100% (responsive) ou valeur fixe en px
- `height`: 350px à 600px (recommandé: 500px)

---

## WIDGET 2 : URSSAF TRACKER

**Description :** Carte interactive de la France - Redressements par région

**Dimensions recommandées :** 800x600px

**Code d'intégration :**

```html
<!-- Societe Anglaise URSSAF Tracker Widget - Start -->
<div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/urssaf-tracker"
    width="100%"
    height="600"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise URSSAF Tracker - Carte des redressements par région"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Source: <a href="https://britflow.co.uk?ref=widget-urssaf" style="color: #ef4444; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Données URSSAF 2024
  </div>
</div>
<!-- Societe Anglaise URSSAF Tracker Widget - End -->
```

**Variante carrée (Instagram style) :**
```html
<iframe src="https://britflow.co.uk#embed/urssaf-tracker" width="600" height="600" frameborder="0" loading="lazy"></iframe>
```

**Personnalisation autorisée :**
- `width`: 100% ou valeur fixe
- `height`: 500px à 800px (recommandé: 600px)

---

## WIDGET 3 : FISCAL EXODUS SIMULATOR

**Description :** Calculateur comparatif France vs UK

**Dimensions recommandées :** 600x800px (vertical)

**Code d'intégration :**

```html
<!-- Societe Anglaise Fiscal Exodus Simulator - Start -->
<div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/fiscal-exodus-simulator"
    width="100%"
    height="800"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise Fiscal Exodus Simulator - Calculateur France vs UK"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Calculateur gratuit par <a href="https://britflow.co.uk?ref=widget-simulator" style="color: #6366f1; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Optimisation fiscale UK
  </div>
</div>
<!-- Societe Anglaise Fiscal Exodus Simulator - End -->
```

**Variante compacte :**
```html
<iframe src="https://britflow.co.uk#embed/fiscal-exodus-simulator" width="100%" height="650" frameborder="0" loading="lazy"></iframe>
```

**Personnalisation autorisée :**
- `width`: 100% ou max 600px
- `height`: 650px à 1000px

---

## WIDGET 4 : BUREAUCRACY CLOCK

**Description :** Comparateur de délais administratifs France vs UK

**Dimensions recommandées :** 600x400px

**Code d'intégration :**

```html
<!-- Societe Anglaise Bureaucracy Clock - Start -->
<div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/bureaucracy-clock"
    width="100%"
    height="400"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise Bureaucracy Clock - Comparateur de délais France vs UK"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Source: <a href="https://britflow.co.uk?ref=widget-bureaucracy" style="color: #10b981; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Données World Bank & Companies House
  </div>
</div>
<!-- Societe Anglaise Bureaucracy Clock - End -->
```

---

## WIDGET 5 : TVA SHOCK SIMULATOR

**Description :** Jauge interactive - Impact du dépassement de seuil de franchise

**Dimensions recommandées :** 500x500px (carré)

**Code d'intégration :**

```html
<!-- Societe Anglaise TVA Shock Simulator - Start -->
<div style="position: relative; width: 100%; max-width: 500px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/tva-shock"
    width="100%"
    height="500"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise TVA Shock Simulator - Seuil de franchise"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Simulateur TVA par <a href="https://britflow.co.uk?ref=widget-tva" style="color: #f97316; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Seuils France vs UK
  </div>
</div>
<!-- Societe Anglaise TVA Shock Simulator - End -->
```

---

## WIDGET 6 : DIVIDEND OPTIMIZER

**Description :** Pie chart - Optimisation salaire vs dividendes

**Dimensions recommandées :** 600x600px (carré)

**Code d'intégration :**

```html
<!-- Societe Anglaise Dividend Optimizer - Start -->
<div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/dividend-optimizer"
    width="100%"
    height="600"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise Dividend Optimizer - Salaire vs Dividendes"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Optimisation rémunération par <a href="https://britflow.co.uk?ref=widget-dividend" style="color: #6366f1; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Comparaison France vs UK
  </div>
</div>
<!-- Societe Anglaise Dividend Optimizer - End -->
```

---

## WIDGET 7 : PRIVACY SCORECARD

**Description :** Radar chart - Anonymat fiscal comparé

**Dimensions recommandées :** 700x500px

**Code d'intégration :**

```html
<!-- Societe Anglaise Privacy Scorecard - Start -->
<div style="position: relative; width: 100%; max-width: 700px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/privacy-scorecard"
    width="100%"
    height="500"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise Privacy Scorecard - Anonymat fiscal France vs UK"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Comparaison confidentialité par <a href="https://britflow.co.uk?ref=widget-privacy" style="color: #10b981; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Sources OCDE, DAC6, PSC
  </div>
</div>
<!-- Societe Anglaise Privacy Scorecard - End -->
```

---

## WIDGET 8 : BANK MATCHMAKER

**Description :** Système de recommandation - Banques UK adaptées au profil

**Dimensions recommandées :** 800x1000px (vertical)

**Code d'intégration :**

```html
<!-- Societe Anglaise Bank Matchmaker - Start -->
<div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/bank-matchmaker"
    width="100%"
    height="1000"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise Bank Matchmaker - Trouvez votre banque UK idéale"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Sélecteur de banques par <a href="https://britflow.co.uk?ref=widget-bank" style="color: #6366f1; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Comparez 9+ banques UK
  </div>
</div>
<!-- Societe Anglaise Bank Matchmaker - End -->
```

---

## WIDGET 9 : LIQUIDATION COST CALCULATOR

**Description :** Calculateur - Coût de fermeture d'entreprise

**Dimensions recommandées :** 700x900px (vertical)

**Code d'intégration :**

```html
<!-- Societe Anglaise Liquidation Cost Calculator - Start -->
<div style="position: relative; width: 100%; max-width: 700px; margin: 0 auto;">
  <iframe
    src="https://britflow.co.uk#embed/liquidation-cost"
    width="100%"
    height="900"
    frameborder="0"
    scrolling="no"
    loading="lazy"
    title="Societe Anglaise Liquidation Cost Calculator - Coût fermeture entreprise"
    style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  </iframe>
  <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #666;">
    Calculateur de liquidation par <a href="https://britflow.co.uk?ref=widget-liquidation" style="color: #ef4444; text-decoration: none; font-weight: bold;">Societe Anglaise</a> -
    Comparaison France vs UK
  </div>
</div>
<!-- Societe Anglaise Liquidation Cost Calculator - End -->
```

---

## INTEGRATION TROUSSEAU (TOUS LES WIDGETS)

**Pour ajouter tous les widgets sur une page "Observatoire" personnalisée :**

```html
<!-- Societe Anglaise Observatoire - Tous les Widgets -->
<div class="britflow-observatoire">

  <!-- Header -->
  <h2 style="text-align: center; margin-bottom: 30px;">
    Observatoire de l'Exode Fiscal 2025
  </h2>

  <!-- Widget 1: FiscalWatch -->
  <h3>1. Défaillances vs Fiscalité</h3>
  <iframe src="https://britflow.co.uk#embed/fiscal-watch" width="100%" height="500" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 2: URSSAF Tracker -->
  <h3>2. Carte des Redressements</h3>
  <iframe src="https://britflow.co.uk#embed/urssaf-tracker" width="100%" height="600" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 3: Fiscal Exodus Simulator -->
  <h3>3. Calculateur France vs UK</h3>
  <iframe src="https://britflow.co.uk#embed/fiscal-exodus-simulator" width="100%" height="800" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 4: Bureaucracy Clock -->
  <h3>4. Délais Administratifs</h3>
  <iframe src="https://britflow.co.uk#embed/bureaucracy-clock" width="100%" height="400" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 5: TVA Shock Simulator -->
  <h3>5. Impact Seuil de TVA</h3>
  <iframe src="https://britflow.co.uk#embed/tva-shock" width="100%" height="500" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 6: Dividend Optimizer -->
  <h3>6. Optimisation Salaire vs Dividendes</h3>
  <iframe src="https://britflow.co.uk#embed/dividend-optimizer" width="100%" height="600" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 7: Privacy Scorecard -->
  <h3>7. Anonymat Fiscal</h3>
  <iframe src="https://britflow.co.uk#embed/privacy-scorecard" width="100%" height="500" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 8: Bank Matchmaker -->
  <h3>8. Sélecteur de Banques UK</h3>
  <iframe src="https://britflow.co.uk#embed/bank-matchmaker" width="100%" height="1000" frameborder="0" loading="lazy"></iframe>

  <!-- Widget 9: Liquidation Cost Calculator -->
  <h3>9. Coût de Fermeture</h3>
  <iframe src="https://britflow.co.uk#embed/liquidation-cost" width="100%" height="900" frameborder="0" loading="lazy"></iframe>

</div>

<!-- Style optionnel -->
<style>
.britflow-observatoire h3 {
  margin-top: 40px;
  margin-bottom: 15px;
  color: #0f172a;
}
.britflow-observatoire iframe {
  margin-bottom: 20px;
}
</style>
```

---

## BONNES PRATIQUES D'INTÉGRATION

### 1. Lazy Loading
Tous les widgets utilisent l'attribut `loading="lazy"` pour un chargement différé, améliorant les performances de la page.

### 2. Responsive Design
Utilisez `width="100%"` pour que les widgets s'adaptent à la largeur de leur conteneur parent.

### 3. Attribution
Le lien retour vers Societe Anglaise est **obligatoire** dans le footer de chaque widget (hardcoded dans l'iframe).

### 4. Analytics Tracking
Les widgets utilisent des paramètres UTM pour suivre les sources :
```html
<a href="https://britflow.co.uk?ref=widget-nom-du-widget">
```

### 5. Accessibilité
- Tous les iframes ont un attribut `title` descriptif
- `scrolling="no"` pour éviter le scroll double
- `frameborder="0"` pour une intégration propre

### 6. Performance
- Limitez à 3 widgets maximum par page pour maintenir les performances
- Utilisez le chargement différé (lazy loading)
- Évitez d'intégrer plusieurs widgets lourds sur la même section de page

---

## TESTS D'INTÉGRATION

Avant de mettre en production, vérifiez :

1. **Le widget s'affiche correctement** sur mobile, tablette et desktop
2. **Le lien retour** vers Societe Anglaise fonctionne
3. **Les interactions** (clics, formulaires) fonctionnent
4. **Le tracking UTM** est bien présent (si applicable)
5. **Les performances** de la page restent bonnes (< 3s de chargement)

---

## FAQ

### Q : Les widgets sont-ils gratuits ?
**R :** Oui, 100% gratuits pour un usage éditorial (presse, blogs, médias). Usage commercial interdit.

### Q : Puis-je modifier la taille des widgets ?
**R :** Oui, vous pouvez modifier `width` et `height` selon vos besoins. Ne modifiez pas le code source du widget lui-même.

### Q : Le lien retour vers Societe Anglaise est-il obligatoire ?
**R :** Oui, c'est une condition obligatoire de la licence. Les widgets contiennent un lien hardcodé qui ne peut être supprimé.

### Q : Puis-je utiliser les widgets sur un site payant ?
**R :** Non, l'usage commercial (payant, abonnement, etc.) est interdit. Contactez-nous pour une licence commerciale : press@britflow.co.uk

### Q : Comment mesurer l'engagement sur les widgets ?
**R :** Les widgets envoient des analytics à Societe Anglaise. Pour vos propres stats, utilisez Google Analytics sur votre page et filtrez par `ref=widget-` dans vos rapports.

### Q : Les widgets mettent-ils à jour les données automatiquement ?
**R :** Oui, tous les widgets sont connectés aux données Societe Anglaise et se mettent à jour automatiquement sans intervention de votre part.

### Q : Puis-je intégrer les widgets dans une app mobile ?
**R :** Oui, utilisez les mêmes codes iframe dans une WebView. Pour une intégration native, contactez-nous.

---

## CONTACT SUPPORT

**Questions techniques ou demandes d'intégration :**
- Email : press@britflow.co.uk
- WhatsApp : +44 77 1234 5678
- Délai de réponse : 48h ouvrées

**Demandes de licence commerciale :**
- Email : business@britflow.co.uk
- Objet : "Licence commerciale widgets"

---

## MISES À JOUR

Les widgets sont mis à jour automatiquement. Aucune action n'est requise de votre part.

**Journal des mises à jour :**
- **v1.0 (Janvier 2025)** : Lancement initial des 9 widgets
- **Prochaine mise à jour prévue** : Avril 2025 (données Q1 2025)

---

*Ce document est mis à jour régulièrement. Vérifiez la version et la date.*

*V1.0 - Janvier 2025*
