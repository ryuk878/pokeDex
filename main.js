const poke_container = document.getElementById('poke_container');


let inputPokemon = document.getElementById('Pokemon')
inputPokemon.onsubmit = submit

function submit() { 
	fetchPokemons(inputPokemon.value)
	clear()
}

function clear() { 
document.getElementById('poke_container').innerHTML = ""
	
}

  

const colors = {
	fire: '#ff0000',
	grass: '#06b814',
	electric: '#fffc33',
	water: '#0077ff ',
	ground: '#8c4c08',
	rock: '#d5d5d4',
	fairy: '#ff0099',
	poison: '#8f3688',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#574675',
	flying: '#d4d6d6',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
	steel: '#60e0cb',
	ice : '#cffaf3',
	ghost : '#665a78',
	dark : '#544e5c'
};
const main_types = Object.keys(colors);

const fetchPokemons = async (amountOfPokemon) => {
	
	for (let i = 1; i <= amountOfPokemon; i++) {
		await grabPokemon(i);
	}
};

const grabPokemon = async id => {
	
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
	
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();


