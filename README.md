# Pokedex - PAC2 JavaScript

![PokeAPI](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

Aplicació web de Pokedex amb HTML, CSS i JavaScript que consumeix la PokeAPI.

🔗 **[Live Demo](https://georginats.github.io/uoc-pac2/)**

## 🚀 Funcionalitats

### Llista de Pokemon
- **Paginació dinàmica**: 20 Pokemon per pàgina amb càlcul automàtic del total des de l'API
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


### Combat Pokemon
- **Mode de joc interactiu**: Sistema de combat amb mecàniques simples
- **Targetes flip animades**: 10 cartes amb efecte de gir 3D
- **Selecció de cartes**: Click per girar i seleccionar 2 Pokemon
- **Sistema de combat automàtic**: Comparació Attack vs Defense
- **Efectes visuals**: Borders verd (guanyador) i vermell (perdedor)
- **Dialog de resultats**: Mostra el guanyador amb detalls del combat
- **Pokemon aleatoris**: Generació de 10 Pokemon diferents cada partida
- **Validació d'IDs**: Límit a Pokemon vàlids (1-1025) per evitar errors 404
- **Optimització de càrrega**:Ús de `Set` per evitar duplicats (O(1) lookup)
- **Reinici de partida**: Botó per començar nou combat amb nous Pokemon

## 🛠️ Tecnologies

- **HTML5**: `<template>`, `<dialog>`, semàntica moderna
- **CSS3**: 
  - Grid i Flexbox per layouts responsives
  - Animacions amb `@keyframes` i `transition`
  - `backdrop-filter` per efectes de vidre
  - Viewport units (`vw`) per responsive design
  - Selectors avançats (`:not()`, pseudo-elements)
  - `transform: rotateY()` per flip cards 3D
  - `perspective` i `transform-style: preserve-3d`
  - `backface-visibility` per ocultació de cares
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
├── styles/styles.css
└── pages/
    └── combat/
        ├── index.html
        ├── combat.js
        └── combat.css
```

## 🎮 Ús

### Llista de Pokemon
1. Obre `index.html`
2. Navega amb paginació (Primera, Anterior, Següent, Última)
3. Usa l'input de pàgina per saltar directament
4. Cerca Pokemon per nom en temps real
5. Click a targeta → detalls en dialog

### Combat
1. Navega a la secció Combat
2. Espera que es carreguin 10 Pokemon aleatoris
3. Click a 2 cartes per girar-les i iniciar combat
4. El Pokemon amb més Attack guanya contra el de més Defense
5. Veu els resultats al dialog
6. Click "Reiniciar Combat" per nova partida

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
