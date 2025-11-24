# Pokedex - PAC2 JavaScript

![PokeAPI](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

Aplicació web de Pokedex amb HTML, CSS i JavaScript que consumeix la PokeAPI.

🔗 **[Live Demo](https://georginats.github.io/uoc-pac2/)**

## 🚀 Funcionalitats

### Llista de Pokemon
- **Paginació dinàmica**: 18 Pokemon per pàgina amb càlcul automàtic del total des de l'API
- **Cerca en temps real**: Filtratge instantani per nom amb paginació integrada
- **Targetes responsives**: Imatge, nom, atac i defensa amb disseny adaptatiu
- **Click per detalls**: Obertura de dialog modal amb informació completa

### Dialog de Detall
- **Element `<dialog>` natiu** amb animacions d'obertura/tancament
- **Scroll automàtic**: Posiciona al top en obrir o canviar de Pokemon
- **Tancament intelligent**: Click al backdrop o botó de tancar
- **Informació completa**:
  - Imatge oficial d'alta qualitat
  - Nom, descripció, categoria i habilitats
  - Alçada, pes i distribució de gènere
  - **Stats amb barres visuals**: HP, Attack, Defense, Speed
  - **Valors màxims dinàmics**: Calculats automàticament des dels primers 150 Pokemon
  - Format "valor actual / màxim" per context
  - **Tipus i debilitats**: Badges amb colors temàtics
  - **Cadena d'evolució completa**: Imatges responsives (25vw) amb navegació
  - **Click a evolució**: Navega al Pokemon seleccionat mantenint el dialog obert

### Optimitzacions Tècniques
- **Càrrega inicial intel·ligent**: Consulta dinàmica del total de Pokemon (no hardcoded)
- **Càlcul de stats màxims**: Mostreig dels primers 150 Pokemon per obtenir valors reals
- **Imatges d'evolució responsives**: 25% del viewport width per adaptació automàtica
- **CSS amb especificitat optimitzada**: `:not()` selector per evitar conflictes
- **Gestió eficient de filtres**: Paginació sobre llista filtrada o completa segons cerca

## 🛠️ Tecnologies

- **HTML5**: `<template>`, `<dialog>`, semàntica moderna
- **CSS3**: 
  - Grid i Flexbox per layouts responsives
  - Animacions amb `@keyframes` i `transition`
  - `backdrop-filter` per efectes de vidre
  - Viewport units (`vw`) per responsive design
  - Selectors avançats (`:not()`, pseudo-elements)
- **JavaScript ES6+**: 
  - `async/await` per peticions asíncrones
  - `fetch()` API per consum de PokeAPI
  - Template literals i destructuring
  - Event delegation i listeners
  - `cloneNode()` per clonació de templates
  - `scrollIntoView()` per control de scroll
  - `Math.max()` i `Math.min()` per càlculs dinàmics
- **PokeAPI v2**: 
  - `/pokemon` - Dades bàsiques i estadístiques
  - `/pokemon-species` - Descripció, categoria, gènere, evolucions
  - `/type` - Debilitats basades en tipus
  - `/evolution-chain` - Cadenes d'evolució completes

## 📁 Estructura

```
practica2/
├── index.html
├── scripts/index.js
└── styles/styles.css
```

## 🎮 Ús

1. Obre `index.html`
2. Navega amb paginació i cerca
3. Click a targeta → detalls en dialog

---

## 📄 Llicència i Autoria

Aquest és un projecte educatiu desenvolupat com a pràctica d'aprenentatge de la **Universitat Oberta de Catalunya (UOC)** per a l'assignatura de desenvolupament web amb JavaScript.

**Objectius didàctics:**
- Manipulació avançada del DOM amb JavaScript
- Consum d'APIs REST amb múltiples endpoints
- Ús d'elements HTML5 moderns (`<template>`, `<dialog>`)
- Responsive design amb viewport units i media queries
- Gestió d'esdeveniments i navegació dins de modals
- Càlculs dinàmics i optimització de rendiment
- Aplicació de bones pràctiques de programació web

**Millores implementades:**
- ✅ Scroll automàtic al top del dialog en canvi de Pokemon
- ✅ Imatges d'evolució responsives amb `25vw`
- ✅ Stats amb valors màxims dinàmics calculats automàticament
- ✅ Total de Pokemon obtingut dinàmicament (no hardcoded)
- ✅ CSS amb especificitat optimitzada amb selectors `:not()`
- ✅ Format "valor / màxim" per millor comprensió de les estadístiques
