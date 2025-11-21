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
    
    // Obtenir la descripció i altres dades de species
    let description = '';
    let category = '';
    let gender = 'Desconegut';
    let evolutionChainUrl = '';
    
    try {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        // Descripció
        const flavorTextEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
        );
        if (flavorTextEntry) {
            description = flavorTextEntry.flavor_text.replace(/\f/g, ' ');
        }
        
        // Categoria (genus)
        const genusEntry = speciesData.genera.find(g => g.language.name === 'en');
        if (genusEntry) {
            category = genusEntry.genus;
        }
        
        // Gènere
        if (speciesData.gender_rate === -1) {
            gender = 'Sense gènere';
        } else if (speciesData.gender_rate === 0) {
            gender = '100% Masculí';
        } else if (speciesData.gender_rate === 8) {
            gender = '100% Femení';
        } else {
            const femalePercent = (speciesData.gender_rate / 8) * 100;
            gender = `${100 - femalePercent}% ♂ / ${femalePercent}% ♀`;
        }
        
        // URL de la cadena d'evolució
        evolutionChainUrl = speciesData.evolution_chain.url;
        
    } catch (error) {
        console.log('Error fetching species:', error);
    }
    
    // Obtenir debilitats basades en els tipus
    const weaknesses = await getTypeWeaknesses(data.types.map(t => t.type.name));
    
    return {
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        height: (data.height / 10).toFixed(1), // Convertir de decímetres a metres
        weight: (data.weight / 10).toFixed(1), // Convertir de hectograms a kg
        category: category,
        abilities: data.abilities.map(a => a.ability.name).join(', '),
        gender: gender,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        types: data.types.map(t => t.type.name),
        weaknesses: weaknesses,
        description: description,
        evolutionChainUrl: evolutionChainUrl
    };
}

// Obtenir debilitats basades en els tipus
const getTypeWeaknesses = async (types) => {
    const weaknessSet = new Set();
    
    try {
        for (const typeName of types) {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
            const typeData = await response.json();
            
            // Afegir tipus als quals aquest tipus és dèbil (damage_relations.double_damage_from)
            typeData.damage_relations.double_damage_from.forEach(weak => {
                weaknessSet.add(weak.name);
            });
        }
    } catch (error) {
        console.log('Error fetching weaknesses:', error);
    }
    
    return Array.from(weaknessSet);
}

// Obtenir cadena d'evolució
const getEvolutionChain = async (evolutionChainUrl) => {
    if (!evolutionChainUrl) return [];
    
    try {
        const response = await fetch(evolutionChainUrl);
        const data = await response.json();
        
        const evolutions = [];
        let current = data.chain;
        
        // Recórrer la cadena d'evolució
        while (current) {
            // Obtenir la imatge del Pokemon
            const speciesResponse = await fetch(current.species.url);
            const speciesData = await speciesResponse.json();
            const pokemonId = speciesData.id;
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemonData = await pokemonResponse.json();
            
            evolutions.push({
                name: current.species.name,
                url: current.species.url,
                image: pokemonData.sprites.other['official-artwork'].front_default,
                id: pokemonId
            });
            current = current.evolves_to[0]; // Agafar la primera evolució
        }
        
        return evolutions;
    } catch (error) {
        console.log('Error fetching evolution chain:', error);
        return [];
    }
}

const openPokemonDialog = async (pokemonUrl, cardElement) => {
    const dialog = document.getElementById('pokemonDialog');
    
    // Forçar scroll a 0 abans de res
    dialog.scrollTo(0, 0);
    
    // Si el diàleg ja està obert, fer scroll a 0 immediatament
    if (dialog.open) {
        dialog.scrollTo(0, 0);
    }
    
    const pokemon = await fetchPokemonFullDetails(pokemonUrl);
    
    // Dades bàsiques
    const img = dialog.querySelector('img');
    const h2 = dialog.querySelector('h2');
    const description = dialog.querySelector('.description');
    
    img.src = pokemon.image;
    img.alt = pokemon.name;
    h2.textContent = pokemon.name;
    description.textContent = pokemon.description;
    
    // Informació bàsica
    dialog.querySelector('.height span').textContent = pokemon.height;
    dialog.querySelector('.weight span').textContent = pokemon.weight;
    dialog.querySelector('.category span').textContent = pokemon.category;
    dialog.querySelector('.abilities span').textContent = pokemon.abilities;
    dialog.querySelector('.gender span').textContent = pokemon.gender;
    
    // Tipus
    const typeList = dialog.querySelector('.type-list');
    typeList.innerHTML = '';
    pokemon.types.forEach(type => {
        const badge = document.createElement('span');
        badge.className = `type-badge type-${type}`;
        badge.textContent = type;
        typeList.appendChild(badge);
    });
    
    // Debilitats
    const weaknessList = dialog.querySelector('.weakness-list');
    weaknessList.innerHTML = '';
    pokemon.weaknesses.forEach(weakness => {
        const badge = document.createElement('span');
        badge.className = `type-badge type-${weakness}`;
        badge.textContent = weakness;
        weaknessList.appendChild(badge);
    });
    
    // Estadístiques amb barres
    const statMaxValues = {
        'hp': 255,
        'attack': 190,
        'defense': 230,
        'speed': 200
    };
    
    dialog.querySelector('.hp-value').textContent = `${pokemon.hp} / ${statMaxValues.hp}`;
    dialog.querySelector('.hp-fill').style.width = `${Math.min((pokemon.hp / statMaxValues.hp) * 100, 100)}%`;
    
    dialog.querySelector('.attack-value').textContent = `${pokemon.attack} / ${statMaxValues.attack}`;
    dialog.querySelector('.attack-fill').style.width = `${Math.min((pokemon.attack / statMaxValues.attack) * 100, 100)}%`;
    
    dialog.querySelector('.defense-value').textContent = `${pokemon.defense} / ${statMaxValues.defense}`;
    dialog.querySelector('.defense-fill').style.width = `${Math.min((pokemon.defense / statMaxValues.defense) * 100, 100)}%`;
    
    dialog.querySelector('.speed-value').textContent = `${pokemon.speed} / ${statMaxValues.speed}`;
    dialog.querySelector('.speed-fill').style.width = `${Math.min((pokemon.speed / statMaxValues.speed) * 100, 100)}%`;
    
    // Evolucions
    const evolutionChain = await getEvolutionChain(pokemon.evolutionChainUrl);
    const evolutionContainer = dialog.querySelector('.evolution-chain');
    evolutionContainer.innerHTML = '';
    
    if (evolutionChain.length > 1) {
        evolutionChain.forEach((evo, index) => {
            const evoItem = document.createElement('div');
            evoItem.className = 'evolution-item';
            
            const evoLink = document.createElement('a');
            evoLink.href = '#';
            evoLink.className = 'evolution-link';
            evoLink.addEventListener('click', async (e) => {
                e.preventDefault();
                const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${evo.id}`;
                
                // Simplement cridar openPokemonDialog sense tancar
                await openPokemonDialog(pokemonUrl, null);
            });
            
            const evoImg = document.createElement('img');
            evoImg.src = evo.image;
            evoImg.alt = evo.name;
            evoImg.className = 'evolution-image';
            
            const evoName = document.createElement('span');
            evoName.textContent = evo.name;
            evoName.className = 'evolution-name';
            
            evoLink.appendChild(evoImg);
            evoLink.appendChild(evoName);
            evoItem.appendChild(evoLink);
            
            evolutionContainer.appendChild(evoItem);
            
            if (index < evolutionChain.length - 1) {
                const arrow = document.createElement('span');
                arrow.textContent = '→';
                arrow.className = 'evolution-arrow';
                evolutionContainer.appendChild(arrow);
            }
        });
    } else {
        evolutionContainer.textContent = 'No té evolucions';
    }
    
    // Afegir classe per transició i obrir el dialog
    dialog.classList.add('opening');
    
    // Si no estava obert, obrir-lo
    if (!dialog.open) {
        dialog.showModal();
    }
    
    // Fer scroll al primer element (la imatge) del diàleg
    const firstElement = dialog.querySelector('img');
    if (firstElement) {
        firstElement.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    
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
        dialog.scrollTop = 0;
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