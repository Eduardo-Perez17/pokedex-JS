// IMPORTAR EL OBJETO DE COLORES Y POKEMON_VIEW
const url_search = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.getElementById("container")
const pokemon = document.getElementById('input');
const search = document.getElementById('search');
const card = document.getElementById('card');
const container_article = document.getElementById('container_article')

// CREATE SEARC POKEMON
const pokemon_data = async() =>{
	try {
		const response = await fetch(`${url_search}${pokemon.value.toLocaleLowerCase()}`)
		const pokemon_data = await response.json()
		return pokemon_data
	} catch {alert('No tenemos este pokemon')}
};

const create_card_pokemon = async pokemon_data => {
	const pokemon_name = pokemon_data.name
	const pokemon_id = pokemon_data.id
	const pokemon_img_front = pokemon_data.sprites.front_default

	const pokemon_info = pokemon_data.species.url
	const response_info_pokemon = await fetch(pokemon_info)
	const info_pokemon_data = await response_info_pokemon.json()

	// CREATE LABEL DATA
	const card_pokemon = document.createElement('div')
	card_pokemon.classList.add('card')

	const pokemon_name_item = document.createElement('h3')
	pokemon_name_item.textContent = pokemon_name

	const pokemon_id_item = document.createElement('p')
	pokemon_id_item.textContent = `#${pokemon_id}`

	const pokemon_img_front_item = document.createElement('img')
	pokemon_img_front_item.setAttribute('src', pokemon_img_front)

	// CARD COLOR
	const pokemon_type = pokemon_data.types
	const pokemon_type_main = pokemon_type[0]

	// INJECT DOCUMENT DATA
	card.append(card_pokemon)
	card_pokemon.append(pokemon_name_item, pokemon_id_item, pokemon_img_front_item)

	// CREATE INFO POKEMON
	const card_pokemon_info = document.createElement('div')
	const card_pokemon_info_color = document.createElement('p')
	const pokemon_egg_groups_info_item = document.createElement('p')
	const pokemon_genera_item = document.createElement('p')
	const pokemon_generation_info = document.createElement('p')
	const pokemon_growth_rate_info = document.createElement('p')
	const pokemon_habitat_info = document.createElement('p')
	const pokemon_names_info_item = document.createElement('p')
	const pokemon_pal_park_encounters_info_item = document.createElement('p')
	const pokemon_shape = document.createElement('p')

	const pokemon_type_info = document.createElement('p')
	const pokemon_experience = document.createElement('p')
	const pokemon_tamano = document.createElement('p')

	try {
		const pokemon_type_info_item = pokemon_data.types[0]
		pokemon_type_info.textContent = `Type : ${pokemon_type_info_item.type.name}`
		pokemon_experience.textContent = `Experience : ${pokemon_data.base_experience}`
		pokemon_tamano.textContent = `Tall : ${pokemon_data.height}`
		pokemon_abilities = pokemon_data.abilities

		card_pokemon_info_color.textContent = `Color : ${info_pokemon_data.color.name}`
		const card_pokemon_info_egg_groups = info_pokemon_data.egg_groups[0]
		pokemon_egg_groups_info_item.textContent = `Groups of cocks : ${card_pokemon_info_egg_groups.name}`
		const pokemon_genera = info_pokemon_data.genera[7]
		pokemon_genera_item.textContent = `Genero : ${pokemon_genera.genus}`
		pokemon_generation_info.textContent = `Generation : ${info_pokemon_data.generation.name}`
		pokemon_growth_rate_info.textContent = `Growth rate : ${info_pokemon_data.growth_rate.name}`
		pokemon_habitat_info.textContent = `Habitat : ${info_pokemon_data.habitat.name}`
		const pokemon_names_info = info_pokemon_data.names[8]
		pokemon_names_info_item.textContent = `${pokemon_names_info.name}`
		const pokemon_pal_park_encounters_info = info_pokemon_data.pal_park_encounters[0]
		pokemon_pal_park_encounters_info_item.textContent = `Pal park encounters : ${pokemon_pal_park_encounters_info.area.name}`
		pokemon_shape.textContent = `Forma : ${info_pokemon_data.shape.name}`
	} catch {console.log('Un dato no definido')}

	for(loop_abilities of pokemon_abilities) {
		const pokemon_abilities_paragraph = document.createElement('p')
		pokemon_abilities_paragraph.textContent = `Ability : ${loop_abilities.ability.name}`
		card_pokemon.append(pokemon_abilities_paragraph)
	}

	card_pokemon.addEventListener('click', ()=>{
		card_pokemon.classList.add('card-info')
		card_pokemon.append(pokemon_img_front_item, pokemon_name_item, pokemon_id_item, pokemon_type_info, pokemon_experience, pokemon_tamano, card_pokemon_info, card_pokemon_info,card_pokemon_info_color,pokemon_egg_groups_info_item,pokemon_genera_item,pokemon_generation_info,pokemon_growth_rate_info,pokemon_habitat_info,pokemon_pal_park_encounters_info_item,pokemon_shape)
	})

}


// CREATE SEARC POKEMON
search.addEventListener('click', async()=>{
	const pokemon_search = await pokemon_data()
	create_card_pokemon(pokemon_search)
})