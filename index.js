const count = 10;
let page = 0;
const article = document.getElementById("article");
const final = document.getElementById("observer");


const background = {
  fire: "#ffbd8d",
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
};

// CREAMOS FUNCION CON UN PARAMETRO Y QUE NOS RETORNE LOS DATOS AL INTRODUCIR UNA URL COMO PARAMETRO
const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {return data})
    .catch((err) => console.log(err));
};

// CREAMOS UNA FUNCION ASIMCRONA CON DOS PARAMETROS "COUNT" Y "PAGE"
const getListPokemons = async (count, page) => {
  const offset = page * count;
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${count}`;
  const list = await getData(url);
  return list;
};

const getDetailsPokemon = async (details) => {
  // data nueva
  const new_promise_pokemon = await Promise.all(details.map((item) => getData(item))).then((Alldata) => {
    return Alldata
  });

  // data vieja
  const old_promise_pokemon = JSON.parse(localStorage.getItem('pokemon'));
  localStorage.setItem('pokemon', JSON.stringify(old_promise_pokemon))
  return new_promise_pokemon;
};

const data_pokemon = (data) => {
  const pokemon_urls = [];
  for (pokemon of data.results) {
    const pokemon_url = pokemon.url;
    pokemon_urls.push(pokemon_url);
  }
  return pokemon_urls;
};

const card_pokemon = (pokemon) => {
  const container_link = document.createElement("a");
  const container = document.createElement("div");
  const container_name = document.createElement("div");
  const container_name_id = document.createElement('div')
  const container_data = document.createElement("div");
  const main_name_pokemon = document.createElement("h3");
  const main_img_front_pokemon = document.createElement("img");

  const container_details = document.createElement("div");
  const container_heart = document.createElement("div");
  const container_atk = document.createElement("div");
  const container_def = document.createElement("div");

  const name_id = document.createElement("p");
  const container_heart_text = document.createElement("p");
  const container_atk_text = document.createElement("p");
  const container_def_text = document.createElement("p");
  const container_heart_name = document.createElement("p");
  const container_atk_name = document.createElement("p");
  const container_def_name = document.createElement("p");
  const pokemon_img_heart = document.createElement("img");
  const pokemon_img_atk = document.createElement("img");
  const pokemon_img_def = document.createElement("img");

  container.setAttribute("class", "container-item");
  container_name.setAttribute("class", "container-name");
  container_data.setAttribute("class", "container-data");
  container_details.setAttribute("class", "container-details");
  pokemon_img_heart.setAttribute("src", "./public/img/heart.png");
  pokemon_img_atk.setAttribute("src", "./public/img/battle.png");
  pokemon_img_def.setAttribute("src", "./public/img/security.png");
  container_name_id.setAttribute('class', 'name_id')
  
  name_id.textContent = `# ${pokemon.id}`
  main_name_pokemon.textContent = pokemon.name;
  const img_container_svg =
  pokemon.sprites.other["dream_world"].front_default;
  main_img_front_pokemon.setAttribute("src", img_container_svg);

  container_name.style.backgroundColor = `${background[pokemon.types[0].type.name] || "#f3abab"}`;
  if(pokemon.types[0].type.name === 'normal') container_name.style.color = colors.black;
  else if(pokemon.types[0].type.name === 'electric') container_name.style.color = colors.black
  else{container_name.style.color = colors.white;} 

  container_link.setAttribute("href", `./pokemon.html?name=${pokemon.name}&id=${pokemon.id}`);

  container_heart_text.innerHTML = `${pokemon.stats[0].base_stat}`;
  container_atk_text.innerHTML = `${pokemon.stats[1].base_stat}`;
  container_def_text.innerHTML = `${pokemon.stats[2].base_stat}`;

  container_heart_name.innerHTML = `<strong>hp</strong>`;
  container_atk_name.innerHTML = `<strong>atk</strong>`;
  container_def_name.innerHTML = `<strong>def</strong>`;

  container_heart.append(
    container_heart_name,
    pokemon_img_heart,
    container_heart_text
  );
  container_atk.append(
    container_atk_name,
    pokemon_img_atk,
    container_atk_text
  );
  container_def.append(
    container_def_name,
    pokemon_img_def,
    container_def_text
  );

  container_name_id.append(main_name_pokemon,name_id)
  container_details.append(container_heart, container_atk, container_def);
  container_name.append(container_name_id,main_img_front_pokemon);
  container.append(container_name, container_details);
  container_link.append(container);
  article.append(container_link);
} 

const call_card_pokemon = (data) => {
  for (pokemon of data) card_pokemon(pokemon)
}

const pokemon_input_event = ()=>{
  btn.addEventListener('click', async()=>{
    const url_search = 'https://pokeapi.co/api/v2/pokemon/';
    if(input.value.length < 1) console.log('necesita mas caracteres') 
    else {
      try {
        article.innerHTML = ''
        const input = document.getElementById('input');
        const btn = document.getElementById('btn');
        const input_item = input.value.toLowerCase()
        const url_search_item = `${url_search}${input_item}`

        const pokemon = await getData(url_search_item)
        card_pokemon(pokemon)
      } catch {
        const up = document.getElementById('up')
        const url_search_error = `${url_search}${143}`
        const pokemon = await getData(url_search_error)

        const err = document.createElement('div')
        const text_err = document.createElement('div')
        const img_err = document.createElement('div')
        const btn_err = document.createElement('div')
        const btn = document.createElement('buttom')
        const paragraph_status = document.createElement('h2')
        const paragraph = document.createElement('p')
        const img = document.createElement('img')

        img.setAttribute('src', pokemon.sprites.other['dream_world'].front_default)
        text_err.setAttribute('class', 'text_err')
        img_err.setAttribute('class', 'img_err')
        btn_err.setAttribute('class', 'btn_err')
        btn.setAttribute('class', 'btn')
        
        img.style.maxWidth = '100%'
        
        paragraph_status.textContent = 'Error 404'
        paragraph.textContent = 'Parece que no se encuentra este Pokemon'
        btn.textContent = 'volver'

        paragraph_status.style.color = '#9d3333'
        btn.addEventListener('click', ()=>window.location.reload())
        up.style.display = 'none'

        text_err.append(paragraph_status,paragraph)
        img_err.append(img)
        btn_err.append(btn)
        err.append(text_err,img_err,btn_err)
        article.append(err)
      }
    }
  })
}
pokemon_input_event()

const sendDataDom = async () => {
  const get_data_pokemon = await getListPokemons(count, page);
  const resolve_data_pokemon = data_pokemon(get_data_pokemon);
  const get_create_card_pokemon = await getDetailsPokemon(resolve_data_pokemon);
  call_card_pokemon(get_create_card_pokemon);
};

// CREAMOS UNA FUNCION ASINCRONA
(async () => {
  sendDataDom();
  // CREAMOS UN OBJETO DONDE PONEMOS DATOS DEL VIEWPORT
  const options = {
    root: null,
    rootMargin: "200px",
    threshold: 1,
  };

  // CREAMOS UNA FUNCION CON UN PARAMETRO PARA PODER JUGAR CON LA API DE INTERSECTIO OBSERVER
  const intersection = (final) => {
    // CREAMOS UN NUEVO OBJETO INTERSECTIO OBSERVER
    const observador = new IntersectionObserver((entries) => {
      // LLAMAMOS UNA FUNCION PARA CADA ELEMENTO Y QUE SEA ASINCRONA
      entries.forEach(async (entry) => {
        // CREAMOS UN OBJETO CON MISMA KEY PERO DIFERENTE VALUE
        const { isIntersecting } = entry;

        // CONDICION PARA SABER SI "isIntersecting" ES TRUE
        if (isIntersecting) {
          // SI ES TRUE QUEREMOS QUE PAGE ++ Y ASI SE MULTIPLICA POR COUNT Y HACEMOS CORRECTAMENTE EL PAGINADO
          page++;
          // CREAMOS UNA CONSTANTE QUE ESPERE PARA PODER LLAMAR LA FUNCION CON LOS PARAMETROS PARA EL PAGINADO
          if(input.value < 1) {sendDataDom()} 
        }
      });
    }, options);
    // LLAMAMOS LA FUNCION "OBERVADOR" CON EL METODO OBSERVE CON EL PARAMETRO "FINAL"
    observador.observe(final);
  };
  // LLAMAMOS LA FUNCION "INTERSECTION" CON EL PARAMETRO "FINAL"
  intersection(final);
})();
