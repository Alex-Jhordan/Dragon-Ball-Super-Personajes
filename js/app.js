// Se selecciona todos lon enlaces que son portada de cada universo obteniendo una NodeList
const nodeListUniversos = document.querySelectorAll(".entrada");

// Se convierte la NodeList obtenida en un array 
const universos = Array.from(nodeListUniversos);

// Se accede el contenedor del texto que nos dice personajes de que universo se visualizan 
const encabezado = document.querySelector("#encabezado");

// Se recorre el array de enlaces para detectar el evento "click"
universos.forEach(universo => {
        universo.addEventListener("click", () => {
            // Se llama a la función consumirAPI y se le pasa el universo escogido por el usuario
            consumirAPI(universo.dataset.universo);
            encabezado.textContent =  `Habitantes del universo ${universo.dataset.universo}`;
        })
})

// Se crea la función async / await que se encargara de consumir la API
const consumirAPI =  async (universo) => {
    // Se crea la estructura try-catch para manejar los errores al consumir la API
    try {
        // Se obtiene la respuesta de la API y se utiliza el método json() para obtener los datos
        const response = await fetch('https://dragon-ball-super-api.herokuapp.com/api/characters');
        const data = await response.json();
        // Se pasa los datos de la API y el universo escogido por el usuario a la función crearCards()
        crearCards(data, universo);
    } catch (error) {
        console.log(error);
    }
}

// Se crea la función que se encargara de crear las card para cada personaje
const crearCards = (data, universo) => {

    // Se filtra de los datos de la API los personajes que pertenezcan al universo escogido por el usuario
    const filterData = data.filter(data => data.universe === universo);

    // Se accede al contenido(card) de la template
    const templateCard = document.querySelector("#templateCard").content;

    // Se accede al contenedor de las card que se van a crear
    const cardsContainer = document.querySelector("#cardsContainer");

    // Se crea un fragment para evitar reflow
    const fragment = document.createDocumentFragment();

    // Se limpia el contenido del contenedor de las cards para evitar que se muestren los personajes de la elección anterior de usuario
    cardsContainer.textContent = "";

    // Se recorre el array con los personajes filtrados
    filterData.forEach(element => {
        // Se clona la card
        const clone = templateCard.cloneNode(true);
        
        // Se modifica el contenido de la card
        clone.querySelector("img").setAttribute("src", element.imageUrl);
        clone.querySelector("h5").textContent = element.name;
        // clone.querySelector("p").textContent = element.specie;

        // Se agrega el clon de la card al fragment
        fragment.appendChild(clone);
    });

    // Se agrega el fragment al contendor de las cards
    cardsContainer.appendChild(fragment);
}