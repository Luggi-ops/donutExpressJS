const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#carrito-productos');
const listaProductos = document.querySelector('#lista-productos');
let itemsCarrito = [];
let countCarrito = 0;


listaProductos.addEventListener('click', agregarACarrito);

function agregarACarrito(event){
    // deshabilitamos la acción por defecto del button
    event.preventDefault();
    

    if(event.target.classList.contains('agregarCarrito')){
        const itemProducto = event.target.closest('.slider-card');
        
        obetenerDatosProducto(itemProducto);
        contadorCarritoAumenta()
    }
}

function obetenerDatosProducto(producto){

    //obtenemos los datos del producto seleccionado
    const datosProducto = {
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('#precio').textContent,
        miniatura: producto.querySelector('img').src,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: producto.querySelector('.cantidad').textContent
    }

    //validamos que no exista el producto en el carrito

    const existe = itemsCarrito.some( producto => {
        return producto.id === datosProducto.id;
    });
    
    if(existe) {
        const productos = itemsCarrito.map( producto => {
            if(producto.id === datosProducto.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
            
        })
        //agregamos al carrito un producto ya existente
        itemsCarrito = [...productos];
    }else{
        //agregamos el producto al carrito que no está duplicado
        itemsCarrito.push(datosProducto);
    }

    //agregamos el producto al carrito
    
    insertarProducto();
    

}

function insertarProducto(){
        limpiarHTML();
    itemsCarrito.forEach( producto =>{
        //destructuring
        const {titulo, precio, miniatura, id, cantidad} =  producto;
        const itemAgregadoRow = document.createElement('tr');
        const itemCarritoContent = `


    <td>
        <img src="${miniatura}">
    </td>

    <td>
        ${titulo}
    </td>

    <td>
        ${precio}
    </td>

    <td>
        ${cantidad}
    </td>

    <td>
        <i class="fas fa-trash-alt eliminarProducto" data-id="${id}"></i>
    </td>

    `;
        itemAgregadoRow.innerHTML = itemCarritoContent;
        contenedorCarrito.appendChild(itemAgregadoRow);

    } )

    guardarStorage();
}

//limpiar codigo html para que no se dupliquen items en el carrito
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//contador de productos en el carrito
function contadorCarritoAumenta(){
    let contadorCarrito = document.querySelector('#carrito-contador');
    let count = parseInt(contadorCarrito.textContent)+1;
    contadorCarrito.textContent = count;
}

function contadorCarritoDisminuye(){
    let contadorCarrito = document.querySelector('#carrito-contador');
    let count = parseInt(contadorCarrito.textContent)-1;
    contadorCarrito.textContent = count;
}

function contadorCarritoReset(){
    let contadorCarrito = document.querySelector('#carrito-contador');
    contadorCarrito.textContent = "0";
}


//setear cantidades aún en proceso
listaProductos.addEventListener('click', aumentarCantidadProducto);

function aumentarCantidadProducto(event){
    if(event.target.classList.contains('aumentar-pedido')){
        console.log('hice click en aumentar');

    }
}

//Eliminar producto
carrito.addEventListener('click', eliminarProducto);


function eliminarProducto(event){
    
    if(event.target.classList.contains('eliminarProducto')){
        const productoID = event.target.getAttribute('data-id');
        console.log(productoID);
        
        itemsCarrito = itemsCarrito.filter( producto => producto.id !== productoID);

        insertarProducto();
        contadorCarritoDisminuye();
        guardarStorage();
    }
}

//vaciar carrito
carrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito(event){
    event.preventDefault();

    const btnVaciar = event.target; 
    if(btnVaciar.id.includes('btn-vaciar')){
        limpiarHTML();
        contadorCarritoReset();
        itemsCarrito = [];
        guardarStorage();
    } 
}

//Guardar en el LS
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(itemsCarrito));
}

//No perder el carrito ante un refresh del document
document.addEventListener('DOMContentLoaded', () => {
    itemsCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    insertarProducto();
})