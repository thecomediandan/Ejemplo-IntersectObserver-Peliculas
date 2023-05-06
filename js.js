"strict mode";
// INTERSECTION OBSERVER nos detecta si un elemento es visible
// o no en el Viewport
// Seleccionamos diversos elementos para esta prueba
const container = document.querySelector(".container");

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

const cargarMasItems = entrada => {
    if (entrada[0].isIntersecting) {
        cargarItems(2);
    }
}

const observador = new IntersectionObserver(cargarMasItems);

var contador = 0;
const cargarItems = async num =>{
    const request = await fetch("informacion.txt");
    const items = await request.json();
    const arr = items.items;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            const newItem = crearItem(arr[contador].title, arr[contador].content);
            fragment.appendChild(newItem);
            contador++;
            if (i == num-1) {
                observador.observe(newItem);
            }
        }else{
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