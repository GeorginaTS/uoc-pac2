const API_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_COUNT = 30;

const fetchPokemons = async (count) => {
    const url = API_URL + `?limit=${count}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

initializeApp = async () => {
    try {
        const pokemonList = await fetchPokemons(POKEMON_COUNT);   
        let list = document.getElementById('pokemonList');
        pokemonList.results.forEach(pokemon => {
            let listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            list.appendChild(listItem);
        }); 
    } catch (error) {
        console.log(error);
    }
}
initializeApp();