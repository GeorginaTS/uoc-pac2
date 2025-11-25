const API_URL = "https://pokeapi.co/api/v2/pokemon";
const COMBAT_POKEMON_COUNT = 10;
let selectedCards = [];
let combatPokemons = [];
let totalPokemonCount = 0;

//--> No inclòs perque retarda molt la carrega, perque ids apartir de 1025 a vegades no existeixen i dona error 404.
// const getTotalPokemonCount = async () => {
//     if (totalPokemonCount === 0) {
//         const response = await fetch(`${API_URL}?limit=1`);
//         const data = await response.json();
//         totalPokemonCount = data.count;
//     }
//     return totalPokemonCount;
// }

// Obtenir Pokemon aleatoris
const fetchRandomPokemons = async (count) => {
    const maxId = 1025;
    const pokemons = [];
    const attempts = [];
    
    for (let attempt = 0; pokemons.length < count; attempt++) { 
        const id = Math.floor(Math.random() * maxId) + 1;
        
        // Evitar IDs duplicats
        if (attempts.includes(id)) {
            continue;
        }
        
        attempts.push(id);
        
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (response.ok) {
                const pokemon = await response.json();
                pokemons.push(pokemon);
            }
        } catch (error) {
            console.warn(`Pokemon ${id} not found, skipping...`);
        }
    }
    
    return pokemons;
}

// Crear carta de combat
const createCombatCard = (pokemon, index) => {
    const template = document.getElementById('combatCardTemplate');
    const clone = template.content.cloneNode(true);
    
    const flipCard = clone.querySelector('.flip-card');
    const img = clone.querySelector('.flip-card-front img');
    const h3 = clone.querySelector('.flip-card-front h3');
    const attackSpan = clone.querySelector('.flip-card-front .attack span');
    const defenseSpan = clone.querySelector('.flip-card-front .defense span');
    
    flipCard.dataset.index = index;
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    img.alt = pokemon.name;
    h3.textContent = pokemon.name;
    attackSpan.textContent = pokemon.stats[1].base_stat;
    defenseSpan.textContent = pokemon.stats[2].base_stat;
    
    flipCard.addEventListener('click', () => handleCardClick(flipCard, index));
    
    return clone;
}

// Gestionar click a carta
const handleCardClick = (card, index) => {
    // Si ja hi ha 2 cartes seleccionades o el joc ha acabat, no fer res
    if (selectedCards.length >= 2 || card.classList.contains('winner') || card.classList.contains('loser')) {
        return;
    }
    
    // Si la carta ja està seleccionada, no fer res
    if (selectedCards.some(c => c.index === index)) {
        return;
    }
    
    // Girar la carta
    card.classList.add('flipped');
    
    // Afegir a seleccionades
    selectedCards.push({ card, index, pokemon: combatPokemons[index] });
    
    // Si ja tenim 2 cartes, iniciar combat
    if (selectedCards.length === 2) {
        setTimeout(() => startCombat(), 800);
    }
}

// Iniciar combat
const startCombat = () => {
    const attacker = selectedCards[0];
    const defender = selectedCards[1];
    
    const attackPower = attacker.pokemon.stats[1].base_stat;
    const defensePower = defender.pokemon.stats[2].base_stat;
    
    let winner, loser;
    
    if (attackPower > defensePower) {
        winner = attacker;
        loser = defender;
    } else {
        winner = defender;
        loser = attacker;
    }
    
    // Girar totes les cartes
    const allCards = document.querySelectorAll('.flip-card');
    allCards.forEach(card => card.classList.add('flipped'));
    
    // Marcar guanyador i perdedor
    setTimeout(() => {
        winner.card.classList.add('selected', 'winner');
        loser.card.classList.add('selected', 'loser');
        
        // Mostrar resultat
        showResult(winner.pokemon, loser.pokemon, attackPower, defensePower);
        
        // Mostrar botó de reset
        document.getElementById('resetBtn').style.display = 'block';
    }, 600);
}

// Mostrar resultat
const showResult = (winner, loser, attackPower, defensePower) => {
    const dialog = document.getElementById('resultDialog');
    const title = document.getElementById('resultTitle');
    const message = document.getElementById('resultMessage');
    
    title.textContent = `${winner.name.toUpperCase()} guanya!`;
    message.textContent = `${winner.name} (Atac: ${attackPower}) ha derrotat ${loser.name} (Defensa: ${defensePower})`;
    
    dialog.showModal();
}

// Reiniciar combat
const resetCombat = () => {
    selectedCards = [];
    const dialog = document.getElementById('resultDialog');
    dialog.close();
    document.getElementById('resetBtn').style.display = 'none';
    initCombat();
}

// ---> Inicialitzar combat
const initCombat = async () => {
    try {
        const grid = document.getElementById('combatGrid');
        grid.innerHTML = '';
        
        combatPokemons = await fetchRandomPokemons(COMBAT_POKEMON_COUNT);
        
        combatPokemons.forEach((pokemon, index) => {
            const card = createCombatCard(pokemon, index);
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading combat:', error);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initCombat();
    
    const dialog = document.getElementById('resultDialog');
    
    document.getElementById('resetBtn').addEventListener('click', resetCombat);
    document.getElementById('playAgainBtn').addEventListener('click', resetCombat);
    document.getElementById('closeDialogBtn').addEventListener('click', () => {
        dialog.close();
    });
});
