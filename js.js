"strict mode";
// INTERSECTION OBSERVER nos detecta si un elemento es visible
// o no en el Viewport
// Seleccionamos diversos elementos para esta prueba
const container = document.querySelector(".container");

// * Funcion que crea un elemento item para utilizarlo en el HTML
const crearItem = (titulo, contenido)=>{
    const item = document.createElement("div");
    const title = document.createElement("h4");
    const content = document.createElement("p");

    item.classList.add("item");

    title.textContent = titulo;
    content.textContent = contenido;

    item.appendChild(title);
    item.appendChild(content);

    return item;
};

// * Callback que le sirve de parametro al IntersectionObserver, el cual almacena un arreglo de todos los elementos, que con isIntersecting podemos detectar que el elemento es visible
const cargarMasItems = entrada => {
    if (entrada[0].isIntersecting) {
        cargarItems(2);
    }
}

const observador = new IntersectionObserver(cargarMasItems);
// * Contador general del arreglo de publicaciones
var contador = 0;
const cargarItems = async num =>{
    // * Devolvemos una promesa
    const request = await fetch("informacion.txt");
    // * Convertimos a JSON
    const items = await request.json();
    // * Obtenemos el arreglo de las publicaciones que se encuentran en la clave 'items'
    const arr = items.items;
    // * Creamos un fragmento de enmpaquetado
    const fragment = document.createDocumentFragment();
    // * ESte for es la cantidad de items que deseamos renderizar por cada interseccion
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            const newItem = crearItem(arr[contador].title, arr[contador].content);
            fragment.appendChild(newItem);
            contador++;
            // * Si es el ultimo item, generamos otra cantidad de items gracias al observador volvemos a ejecutar esta función
            if (i == num - 1) {
                // * Una vez definido el observador este esta vinculado a nivel de ejecución eso significa que al observar los itemas seleccionados ejecutar las acciones del Callback.
                observador.observe(newItem);
            }
        }else{
            // * Si ya no hay mas items que cargar, verficamos que no exista la caja de "No hay más publicaciones." para poder crearlo una sola vez. Esto para evitar que se vuelva a ejecutar el observador con los otros items de arriba, esto signifca que si volvemos a esos items se volvera a ejecutar esta funcion.
            if (container.lastElementChild.id != "nomore") {
                let noMore = document.createElement("h4");
                noMore.textContent = "No hay más publicaciones.";
                noMore.id = "nomore";
                fragment.appendChild(noMore);
                container.appendChild(fragment);
                break;
            }
        }
    }
    container.appendChild(fragment);
}

cargarItems(3);