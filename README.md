# Pokedex - PAC2 JavaScript

![PokeAPI](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

Aplicació web de Pokedex amb HTML, CSS i JavaScript que consumeix la PokeAPI.

🔗 **[Live Demo](https://georginats.github.io/uoc-pac2/)**

## 🚀 Funcionalitats

### Llista de Pokemon
- Paginació de 20 Pokemon per pàgina
- Cerca en temps real
- Targetes amb imatge, nom, atac i defensa
- Click per veure detalls en dialog modal

### Dialog de Detall
- Element `<dialog>` natiu amb animació
- Informació completa: imatge, nom, descripció, stats (HP, atac, defensa, velocitat) i tipus
- Obtingut de `/pokemon` i `/pokemon-species`

## 🛠️ Tecnologies

- **HTML5**: `<template>`, `<dialog>`
- **CSS3**: Grid, Flexbox, animacions, backdrop-filter
- **JavaScript ES6+**: Async/await, `cloneNode()`, event listeners
- **PokeAPI v2**: Endpoints `/pokemon`, `/pokemon-species`

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
- Manipulació del DOM amb JavaScript
- Consum d'APIs REST
- Ús d'elements HTML5 moderns (`<template>`, `<dialog>`)
- Aplicació de bones pràctiques de programació web
