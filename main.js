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

  obtenerPrecioTotal() {
    let precioTotal = 0;

    for (const elemento of this.elementos) {
      precioTotal = precioTotal + elemento.cantidad * elemento.precio;
    }

    return precioTotal
  }

  obtenerCantidadDeElementoConId(id) {
    if (this.contieneElementoConId(id)) {
      const elemento = this.elementos.find((elemento) => elemento.id === id);
      return elemento.cantidad
    } else {
      return 0;
    }
  }

  actualizarStorage() {
    localStorage.setItem(this.claveEnStorage, JSON.stringify(this.elementos));
  }
}

const divHamburguesas = document.querySelector('#div-hamburguesas');
const precioTotal = document.querySelector('#precio-total');
const botonFinalizarCompra = document.querySelector('#boton-finalizar-compra');

const actualizarPrecioTotal = () => {
  precioTotal.innerText = carrito.obtenerPrecioTotal();
}

const carrito = new Carrito();
actualizarPrecioTotal()

botonFinalizarCompra.addEventListener('click', () => {
  carrito.vaciar();
  actualizarPrecioTotal();
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
      const cantidadEnCarrito = carrito.obtenerCantidadDeElementoConId(hamburguesa.id)
      divHamburguesas.innerHTML += `
        <div class="card mb-3 pt-5 color-barra" id="hamburguesa${hamburguesa.id}">
          <h3 class="card-header">${hamburguesa.nombre}</h3>
          <img src="${hamburguesa.img}" class="d-block user-select-none imagen-de-producto rounded-pill">
          <div class="card-body">
            <p class="card-text">Ingredientes: ${hamburguesa.descripcion}</p>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Precio $${hamburguesa.precio}</li>
              <li class="list-group-item pt-3">Cantidad</li>
            </ul>
            <input type="number" value="${cantidadEnCarrito}" min="1" id="cantidad-${hamburguesa.id}">
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
        carrito.agregarElemento(hamburguesa, Number(inputCantidadAAgregar.value));
        actualizarPrecioTotal();
        Toastify({
          text: "Hamburguesa agregada al carrito",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () { }
        }).showToast();
      });

      botonEliminarDelCarrito.addEventListener('click', () => {
        carrito.eliminarElemento(hamburguesa.id);
        actualizarPrecioTotal();
        Toastify({
          text: "Hamburguesa eliminada del carrito",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #79090b, #a200ff)",
          },
          onClick: function () { }
        }).showToast();
      })
    })
  })


