const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';
const MAX_TEAM_SIZE = 6;

window.onload = () => {
  loadPokemon();
  timeCounter();
}

let userTeam = [];

// En primer lloc, carreguem els 151 Pokemon de la regió de Kanto
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

// Funció per mostrar els detalls d'un Pokémon un cop s'ha clicat el botó "Veure Detalls"
async function showPokemonDetails(pokemonName) {
  const response = await fetch(`${POKEAPI_URL}${pokemonName}`);
  if (!response.ok) {
      alert('Error!');
      return;
  }
  const pokemon = await response.json();
  displayPokemonInfo(pokemon);
}

function displayPokemonInfo(pokemon) {
  const pokemonInfoSection = document.getElementById('pokemon-info');
  pokemonInfoSection.innerHTML = `
      <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Id: ${pokemon.id}</p>
      <p>Tipus: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
  `;
}

// Funció per afegir un Pokémon a l'equip de l'usuari un cop s'ha clicat el botó "Afegir a l'equip"
async function addToTeam(pokemonName) {
  if (userTeam.length >= MAX_TEAM_SIZE) {
      alert("El teu equip ja està complet! (6 Pokémon)");
      return;
  }
  const response = await fetch(`${POKEAPI_URL}${pokemonName}`);
  const pokemon = await response.json();

  userTeam.push({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name).join(', ')
  });

  updateUserTeam();
}

function updateUserTeam() {
  const teamContainer = document.getElementById('team-container');
  teamContainer.innerHTML = '';

  userTeam.forEach(pokemon => {
      const teamCard = document.createElement('div');
      teamCard.classList.add('team-card');
      teamCard.innerHTML = `
          <h3>${pokemon.name.toUpperCase()}</h3>
          <img src="${pokemon.image}" alt="${pokemon.name}">
          <p>ID: ${pokemon.id}</p>
          <p>Tipus: ${pokemon.types}</p>
      `;
      teamContainer.appendChild(teamCard);
  });
}

// Funció per comptar el temps que l'usuari ha estat a la pàgina (es mostra a la part inferior de la pàgina)
function timeCounter() {
  const timeCounterElement = document.getElementById('time-counter');
  setInterval(() => {
      timeCounterElement.innerText = +timeCounterElement.innerText + 1;
  }, 1000);
}
