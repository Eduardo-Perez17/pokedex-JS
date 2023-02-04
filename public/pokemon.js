const background = {
  fire: "#feaf76",
  grass: "#68a160",
  electric: "#ffed77",
  water: "#7fa8e9",
  ground: "#ddc164",
  rock: "#90642D",
  poison: "#c48fce",
  bug: "#97a23f",
  dragon: "#8faadd",
  psychic: "#ed7a7a",
  flying: "#CDCDCD",
  fighting: "#FF5D5D",
  normal: "#dcdcdc"
};

const colors = {
  white: '#fff',
  black: '#000'
}

const header = document.getElementById('header')
const img_pokemon = document.getElementById('img_pokemon')
const article = document.getElementById('article')
const info_pokemon = document.getElementById('info')

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let producto = urlParams.get('name');
const
keys = urlParams.keys(),
values = urlParams.values(),
entries = urlParams.entries();

let value_url;
let value_id;
for (value of values) {
  value_url = value;
  value_id = value;
}

const url = `https://pokeapi.co/api/v2/pokemon/${value_url}`
const url_evolution = `https://pokeapi.co/api/v2/evolution-chain/${value_id}`

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {return data})
    .catch((err) => console.log(err));
}

const dataPokemon = (data, evolution) => {
  console.log(data)
  const container = document.createElement('div')
  const container_img = document.createElement('div')
  const container_data = document.createElement('div')
  const container_pokemon_img = document.createElement('img')
  const main_name = document.createElement('h2')
  
  const container_details = document.createElement('div')
  const container_info = document.createElement('div') 
  const main_id = document.createElement('div')
  const main_base_experience = document.createElement('div')
  const main_height = document.createElement('div')
  const main_weight = document.createElement('div')
  const main_move = document.createElement('div')
  const move_title = document.createElement('h4')
  const move_paragraph = document.createElement('p')
  
  const id = document.createElement('p')
  const base_experience = document.createElement('p')
  const height = document.createElement('p')
  const weight = document.createElement('p')
  
  const main_types = document.createElement('div')
  const main_types_paragraph = document.createElement('p')

  container.setAttribute('class','container')
  container_img.setAttribute('class','container-img')
  container_data.setAttribute('class','container-data')
  container_pokemon_img.setAttribute('src', data.sprites.other['dream_world'].front_default)
  container_info.setAttribute('class', 'container_info')
  main_types.setAttribute('class', 'container_main_types')
  container_details.setAttribute('class', 'container_details')
  main_move.setAttribute('class', 'main_move')

  main_name.textContent = `${data.name}`
  main_types_paragraph.textContent = data.types[0].type.name

  id.textContent = `Id : ${data.id}`
  base_experience.textContent = `Experience : ${data['base_experience']}`
  height.textContent = `Height : ${data.height}`
  weight.textContent = `Weight : ${data.weight}`

  const moves_slice = data.moves.slice(0, 11)
  let move_name = []
  for(move of moves_slice) move_name.push(move.move.name)

  const new_object_abilities = {};
  for(abilities of data.abilities) {
    new_object_abilities[abilities.ability.name] = abilities.ability.name
  }
  move_title.textContent = 'Ability :'
  move_paragraph.textContent = Object.values(new_object_abilities)

  // IMAGENES DE LOS TIPOS DE POKEMONES
  const icon_img = {
    fire: './public/img/img-pokemon/fire.png',
    grass: './public/img/img-pokemon/grass.png',
    electric: './public/img/img-pokemon/electric.png',
    water: './public/img/img-pokemon/water.png',
    ground: './public/img/img-pokemon/ground.png',
    rock: './public/img/img-pokemon/rock.png',
    poison: './public/img/img-pokemon/poison.png',
    bug: './public/img/img-pokemon/bug.png',
    dragon: './public/img/img-pokemon/dragon.png',
    psychic: './public/img/img-pokemon/psychic.png',
    flying: './public/img/img-pokemon/flying.png',
    fighting: './public/img/img-pokemon/fighting.png',
    steel: './public/img/img-pokemon/steel.png',
    normal: './public/img/img-pokemon/normal.png'
  }
  
  // CODIGO DE LOS ICONOS DE POKEMON DETELLES
  const icon_details = {
    hash: './public/img/icon-details/hash.png',
    experience: './public/img/icon-details/brain.png',
    height: './public/img/icon-details/height.png',
    weight: './public/img/icon-details/weight.png',
  }

  const icon_img_item = document.createElement('img')
  const icon_details_hash = document.createElement('img')
  const icon_details_experience = document.createElement('img')
  const icon_details_height = document.createElement('img')
  const icon_details_weight = document.createElement('img')
  icon_details_hash.setAttribute('src', icon_details.hash)
  icon_details_experience.setAttribute('src', icon_details.experience)
  icon_details_height.setAttribute('src', icon_details.height)
  icon_details_weight.setAttribute('src', icon_details.weight)

  const canva_item = document.createElement('canvas')
  canva_item.setAttribute('class', 'canvas')
  canva_item.setAttribute('height', '300')

  const new_object_stats = {};
  data.stats.forEach(e=>{
    new_object_stats[e.stat.name] = e['base_stat'];
  })

  // CODIGO DE LAS ESTADISTICAS
  const myChart = new Chart(canva_item,{
    type:'pie',
    data: {
      labels:Object.keys(new_object_stats),
      datasets: [{
        label: 'Status',
        data:Object.values(new_object_stats),
        backgroundColor: [
          '#FF5D5D',
          '#feaf76',
          '#8faadd',
          '#c48fce',
          '#90642D',
          '#CDCDCD'
        ],
        borderColor: [
          '#fd3d3d',
          '#f6944e',
          '#6d96e3',
          '#be71cd',
          '#654319',
          '#a2a2a2',
        ],
        borderWidth: 1.5
      }]
    }
  })

  document.body.style.background = `${background[data.types[0].type.name] || "#f3abab"}`;
  main_types.style.backgroundColor = `${background[data.types[0].type.name] || "#f3abab"}`;
  icon_img_item.setAttribute('src', `${icon_img[data.types[0].type.name] || "#f3abab"}`)
  if(data.types[0].type.name === 'normal') main_types_paragraph.style.color = colors.black;
  else if(data.types[0].type.name === 'electric') main_types_paragraph.style.color = colors.black
  else{main_types_paragraph.style.color = colors.white;} 

  // INYECTAMOS TODO
  // NOMBRE, TIPO E IMAGENES
  main_types.append(main_types_paragraph,icon_img_item)
  img_pokemon.append(container_pokemon_img)
  container_data.append(main_name,main_types)
  container_info.append(canva_item)

  // DETALLES DEL POKEMON
  main_id.append(icon_details_hash, id)
  main_base_experience.append(icon_details_experience ,base_experience)
  main_height.append(icon_details_height,height)
  main_weight.append(icon_details_weight,weight)
  container_details.append(main_id,main_base_experience,main_height,main_weight)
  main_move.append(move_title,move_paragraph)

  article.append(container_data)
  info_pokemon.append(container_details, main_move ,container_info)
}

const sendDataDom = async() => {
  const send_get_data = await getData(url)
  const send_get_data_evolution = await getData(url_evolution)
  dataPokemon(send_get_data, send_get_data_evolution)
}
sendDataDom()