# Pokedex - PAC2 JavaScript

Aplicació web interactiva de Pokedex desenvolupada amb HTML, CSS i JavaScript pur (Vanilla JS) que consumeix la PokeAPI per mostrar informació sobre Pokemon.

## 📋 Descripció del Projecte

Aquest projecte és una pràctica d'aprenentatge que implementa una aplicació web amb tres funcionalitats principals:

1. **Llista de Pokemon**: Pàgina principal amb targetes de Pokemon
2. **Detall de Pokemon**: Vista detallada d'un Pokemon específic
3. **Combat Pokemon**: Mode de joc per enfrontar dos Pokemon

## 🎯 Objectius d'Aprenentatge

- Treballar amb JavaScript per interactuar amb el DOM
- Crear i eliminar elements HTML dinàmicament
- Modificar i interactuar amb CSS des de JavaScript
- Consumir una API externa (PokeAPI)
- Realitzar operacions de consulta i interpretar dades JSON
- Gestionar la navegació entre pàgines amb paràmetres URL

## 🚀 Funcionalitats

### Pàgina Principal - Llista de Pokemon

- Mostra 20 Pokemon amb les seves targetes
- Cada targeta conté:
  - Nom del Pokemon (`Objecte.name`)
  - Imatge (`Objecte.sprites.other['official-artwork'].front_default`)
  - Atac (`Objecte.stats[1].base_stat`)
  - Defensa (`Objecte.stats[2].base_stat`)
  - Botó per veure detalls
- **Filtre de cerca**: Input de text que filtra Pokemon en temps real mentre s'escriu

### Pàgina de Detall

- S'accedeix mitjançant URL amb paràmetre: `index.html?pokeID=5`
- Mostra informació detallada del Pokemon:
  - ID del Pokemon
  - Nom
  - Imatge d'alta qualitat
  - Estadístiques d'atac i defensa
- Botó per tornar a la llista principal

### Pàgina de Combat

- S'accedeix mitjançant: `pages/combat.html`
- Mostra 10 Pokemon aleatoris en format flip cards
- Les cartes estan inicialment girades (boca avall)
- **Mecànica del joc**:
  1. L'usuari selecciona dues cartes
  2. Les cartes es giren amb animació (flip)
  3. La primera carta és l'atacant (usa el valor d'atac)
  4. La segona carta és el defensor (usa el valor de defensa)
  5. Si atac > defensa → guanya l'atacant
  6. Si atac ≤ defensa → guanya el defensor
- **Efectes visuals finals**:
  - Totes les cartes es giren automàticament
  - Les dues cartes seleccionades es fan 1.5x més grans
  - La carta guanyadora té un contorn verd
  - La carta perdedora té un contorn vermell
- Diàleg personalitzat amb el resultat i opció de tornar a jugar
- Botó per reiniciar el combat

## 🛠️ Tecnologies Utilitzades

- **HTML5**: Estructura de les pàgines
- **CSS3**: Estils, animacions i efectes (flip cards, transicions)
- **JavaScript (Vanilla)**: Lògica de l'aplicació i manipulació del DOM
- **PokeAPI**: API REST pública per obtenir dades dels Pokemon

## 📁 Estructura del Projecte

```
practica2/
├── index.html              # Pàgina principal amb llista de Pokemon
├── pages/
│   └── combat.html         # Pàgina de combat
├── scripts/
│   ├── index.js           # Lògica general i funcions d'API
│   └── combat.js          # Lògica específica del combat
├── styles/
│   └── styles.css         # Tots els estils de l'aplicació
└── README.md              # Aquest fitxer
```

## 🎮 Com Utilitzar l'Aplicació

1. Obrir `index.html` en un navegador web
2. Navegar per la llista de Pokemon
3. Utilitzar el filtre per buscar Pokemon específics
4. Clicar en "Veure detalls" per veure informació detallada
5. Navegar a "Combat" per jugar
6. Seleccionar dues cartes per iniciar el combat

## 🔧 Funcions Principals de JavaScript

### Gestió de Dades

- `fetchPokemon(id)`: Obté dades d'un Pokemon específic
- `fetchPokemonList(count)`: Obté una llista de Pokemon
- `fetchRandomPokemon(count)`: Obté Pokemon aleatoris per al combat


## 📚 API Utilitzada

**PokeAPI**: [https://pokeapi.co/](https://pokeapi.co/)

Endpoints utilitzats:
- `GET /pokemon?limit={count}`: Llista de Pokemon
- `GET /pokemon/{id}`: Detalls d'un Pokemon específic

## 🎨 Característiques de Disseny

- Disseny responsive adaptat a diferents mides de pantalla
- Gradients de colors moderns
- Animacions CSS suaves
- Efecte flip card per les cartes del combat
- Diàleg modal personalitzat
- Indicadors visuals per guanyadors i perdedors

## 👥 Autoria

Projecte desenvolupat com a pràctica d'aprenentatge de JavaScript i APIs.

## 📄 Llicència

Aquest és un projecte educatiu de la Universitat Oberta de Catalunya (UOC).
