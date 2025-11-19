const API_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_COUNT = 20;
let currentPage = 1;
let totalPokemons = 0;
let allPokemonList = []; // Guardar tota la llista per filtrar



const fetchPokemons = async (limit, offset) => {
    const url = API_URL + `?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
// Funció per crear una card de Pokemon usant el template
const createPokemonCard = (pokemon, pokemonUrl) => {
    const template = document.getElementById('pokemonCardTemplate');
    const clone = template.content.cloneNode(true);
    
    const article = clone.querySelector('article');
    const img = clone.querySelector('img');
    const h3 = clone.querySelector('h3');
    const attackSpan = clone.querySelector('.attack span');
    const defenseSpan = clone.querySelector('.defense span');
    
    img.src = pokemon.image;
    img.alt = pokemon.name;
    h3.textContent = pokemon.name;
    attackSpan.textContent = pokemon.attack;
    defenseSpan.textContent = pokemon.defense;
    
    // Afegir event listener per obrir el dialog
    article.addEventListener('click', (e) => {
        openPokemonDialog(pokemonUrl, e.currentTarget);
    });
    
    return clone;
}
const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat
    };
}

const fetchPokemonFullDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    
    // Obtenir la descripció de species
    let description = '';
    try {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const flavorTextEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );
        if (flavorTextEntry) {
            description = flavorTextEntry.flavor_text.replace(/\f/g, ' ');
        }
    } catch (error) {
        console.log('Error fetching species:', error);
    }
    
    return {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        types: data.types.map(t => t.type.name),
        description: description
    };
}

const openPokemonDialog = async (pokemonUrl, cardElement) => {
    const dialog = document.getElementById('pokemonDialog');
    const pokemon = await fetchPokemonFullDetails(pokemonUrl);
    
    // Omplir el dialog amb les dades
    const img = dialog.querySelector('img');
    const h2 = dialog.querySelector('h2');
    const description = dialog.querySelector('.description');
    const hpSpan = dialog.querySelector('.hp span');
    const attackSpan = dialog.querySelector('.attack span');
    const defenseSpan = dialog.querySelector('.defense span');
    const speedSpan = dialog.querySelector('.speed span');
    const typeList = dialog.querySelector('.type-list');
    
    img.src = pokemon.image;
    img.alt = pokemon.name;
    h2.textContent = pokemon.name;
    description.textContent = pokemon.description;
    hpSpan.textContent = pokemon.hp;
    attackSpan.textContent = pokemon.attack;
    defenseSpan.textContent = pokemon.defense;
    speedSpan.textContent = pokemon.speed;
    typeList.textContent = pokemon.types.join(', ');
    
    // Afegir classe per transició
    dialog.classList.add('opening');
    dialog.showModal();
    
    // Treure classe després de l'animació
    setTimeout(() => {
        dialog.classList.remove('opening');
    }, 300);
}

const closePokemonDialog = () => {
    const dialog = document.getElementById('pokemonDialog');
    dialog.classList.add('closing');
    
    setTimeout(() => {
        dialog.close();
        dialog.classList.remove('closing');
    }, 300);
}

const renderPokemonList = async (page, filteredList = null) => {
    try {
        let pokemonList;
        
        if (filteredList) {
            // Si hi ha filtre, usar la llista filtrada
            pokemonList = {
                results: filteredList.slice((page - 1) * POKEMON_COUNT, page * POKEMON_COUNT),
                count: filteredList.length
            };
            totalPokemons = filteredList.length;
        } else {
            // Si no hi ha filtre, carregar de l'API
            const offset = (page - 1) * POKEMON_COUNT;
            pokemonList = await fetchPokemons(POKEMON_COUNT, offset);
            totalPokemons = pokemonList.count;
        }
        
        const list = document.getElementById('pokemonList');
        list.innerHTML = '';
        
        for (const pokemon of pokemonList.results) {
            const pokemonDetails = await fetchPokemonDetails(pokemon.url);
            const listItem = document.createElement('li');
            listItem.appendChild(createPokemonCard(pokemonDetails, pokemon.url));
            list.appendChild(listItem);
        }
        
        updatePaginationButtons();
    } catch (error) {
        console.log(error);
    }
}

const updatePaginationButtons = () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');
    const totalPages = Math.ceil(totalPokemons / POKEMON_COUNT);
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
    pageInfo.textContent = `Pàgina ${currentPage} de ${totalPages}`;
}

initializeApp = async () => {
    // Carregar tots els Pokemon per al filtre
    const allPokemonData = await fetchPokemons(10000, 0);
    allPokemonList = allPokemonData.results;
    
    await renderPokemonList(currentPage);
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dialog = document.getElementById('pokemonDialog');
    const closeBtn = dialog.querySelector('.close-dialog');
    const searchInput = document.getElementById('search');
    
    // Event listener per la cerca
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Si el input està buit, mostrar tots els Pokemon
            currentPage = 1;
            renderPokemonList(currentPage);
        } else {
            // Filtrar Pokemon pel nom
            const filteredPokemons = allPokemonList.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchTerm)
            );
            currentPage = 1;
            renderPokemonList(currentPage, filteredPokemons);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) {
                const filteredPokemons = allPokemonList.filter(pokemon => 
                    pokemon.name.toLowerCase().includes(searchTerm)
                );
                renderPokemonList(currentPage, filteredPokemons);
            } else {
                renderPokemonList(currentPage);
            }
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(totalPokemons / POKEMON_COUNT);
        if (currentPage < totalPages) {
            currentPage++;
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) {
                const filteredPokemons = allPokemonList.filter(pokemon => 
                    pokemon.name.toLowerCase().includes(searchTerm)
                );
                renderPokemonList(currentPage, filteredPokemons);
            } else {
                renderPokemonList(currentPage);
            }
        }
    });
    
    // Event listeners per tancar el dialog
    closeBtn.addEventListener('click', closePokemonDialog);
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            closePokemonDialog();
        }
    });
}
initializeApp();