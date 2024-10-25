const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';
const MAX_TEAM_SIZE = 6;

document.addEventListener('DOMContentLoaded', () => {
    loadPokemon();
    setupSearchForm();
});

window.onload = () => {
  const timeCounterElement = document.getElementById('time-counter');
  setInterval(() => {
    timeCounterElement.innerText = +timeCounterElement.innerText + 1;
  }, 1000);
}

let userTeam = [];

async function loadPokemon() {
    const response = await fetch(`${POKEAPI_URL}?limit=151`);
    const data = await response.json();

    const pokemonList = document.getElementById('pokemon-list');
    data.results.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `<p>${pokemon.name.toUpperCase()}</p>
                                 <button onclick="showPokemonDetails('${pokemon.name}')">Veure Detalls</button>
                                 <button onclick="addToTeam('${pokemon.name}')">Afegir a l'equip</button>`;
        pokemonList.appendChild(pokemonCard);
    });
}

