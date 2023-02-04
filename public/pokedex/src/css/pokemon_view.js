let page = 20
let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${page}`;
const container = document.getElementById("container");

const get_data = (url)=> { 
	return fetch(url).then(res=>res.json()).then(data=>{return data}).catch(err=>console.log(err))
}

const pokemon = async(pokemon)=> {
	for(data of pokemon.results) {
		const pokemon_info = data.url
		const get_data_pokemon = await fetch(pokemon_info).then(res=>res.json())

		const container_pokemon = document.createElement("div")
		const container_pokemon_img = document.createElement("div")
		const id_pokemon = document.createElement("p")
		const img_pokemon = document.createElement("img")
		const name_pokemon = document.createElement("h3")

		name_pokemon.textContent = data.name
		id_pokemon.textContent = `#${get_data_pokemon.id}`
		container_pokemon.setAttribute("class", "container_pokemon")
		img_pokemon.setAttribute("src", get_data_pokemon.sprites.front_default)

		container_pokemon.append(id_pokemon, container_pokemon_img)
		container_pokemon_img.append(img_pokemon,name_pokemon)
		container.append(container_pokemon)
	}
}
 
addEventListener("load", async()=> {
	const pokemon_load = await get_data(url)
	pokemon(pokemon_load)
})