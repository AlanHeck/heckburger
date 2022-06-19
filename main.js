class Carrito {
  claveEnStorage;
  elementos;

  constructor() {
    this.claveEnStorage = 'CARRITO';

    const carritoEnStorage = localStorage.getItem(this.claveEnStorage);

    if (carritoEnStorage === null) {
      this.elementos = [];
      this.actualizarStorage();
    } else {
      this.elementos = JSON.parse(carritoEnStorage);
    }
  }

  contieneElementoConId(id) {
    const elementoEncontrado = this.elementos.find((elemento) => elemento.id === id);
    return elementoEncontrado !== undefined;
  }

  agregarElemento(elementoAAgregar, cantidad) {
    if (this.contieneElementoConId(elementoAAgregar.id)) {
      // actualizar
      const elementoEnCarrito = this.elementos.find((elemento) => elemento.id === elementoAAgregar.id);
      elementoEnCarrito.cantidad = cantidad;
    } else {
      // crear
      this.elementos.push({
        ...elementoAAgregar,
        cantidad: cantidad
      });
    }

    this.actualizarStorage();
  }

  eliminarElemento(id) {
    this.elementos = this.elementos.filter((elemento) => elemento.id !== id);
    this.actualizarStorage();
  }

  vaciar() {
    this.elementos = [];
    this.actualizarStorage();
  }

  actualizarStorage() {
    localStorage.setItem(this.claveEnStorage, JSON.stringify(this.elementos));
  }
}

const divHamburguesas = document.querySelector('#div-hamburguesas');
const botonFinalizarCompra = document.querySelector('#boton-finalizar-compra');

let carrito = new Carrito();

botonFinalizarCompra.addEventListener('click', () => {
  carrito.vaciar();
  Swal.fire({
    icon: 'success',
    title: 'Pedido confirmado',
    text: 'Pasalo a buscar en 20 minutos',
    footer: 'Heck Burgers'
  })
})

fetch("hamburguesas.json")
  .then(response => response.json())
  .then(hamburguesas => {
    hamburguesas.forEach((hamburguesa) => {
      divHamburguesas.innerHTML += `
        <div class="card mb-3" id="hamburguesa${hamburguesa.id}">
          <h3 class="card-header">${hamburguesa.nombre}</h3>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <h6 class="card-subtitle text-muted">Support card subtitle</h6>
          </div>
          <img src="${hamburguesa.img}" class="d-block user-select-none imagen-de-producto">
          <div class="card-body">
            <p class="card-text">${hamburguesa.descripcion}</p>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">$${hamburguesa.precio}</li>
              <li class="list-group-item">${hamburguesa.stock}</li>
            </ul>
            <input type="number" value="1" min="1" id="cantidad-${hamburguesa.id}">
            <button id="boton${hamburguesa.id}" class="btn btn-dark"">Agregar al carrito</button>
            <button id="boton-eliminar-${hamburguesa.id}" class="btn btn-dark"">Eliminar del carrito</button>
          </div>
        </div>
      `;
    });
    hamburguesas.forEach((hamburguesa) => {
      const botonAgregarAlCarrito = document.querySelector(`#boton${hamburguesa.id}`);
      const botonEliminarDelCarrito = document.querySelector(`#boton-eliminar-${hamburguesa.id}`);
      const inputCantidadAAgregar = document.querySelector(`#cantidad-${hamburguesa.id}`);

      botonAgregarAlCarrito.addEventListener('click', () => {
        carrito.agregarElemento(hamburguesa, Number(inputCantidadAAgregar.value))
      });

      botonEliminarDelCarrito.addEventListener('click', () => {
        carrito.eliminarElemento(hamburguesa.id);
      })
    })
  })
