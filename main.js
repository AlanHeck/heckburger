class Hamburguesa{
    constructor(nombre, descripcion, precio, stock, img){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.img = img
    }
}

const hamburguesa1 = new Hamburguesa("plaplap", "plapalpal", 1100, 50,)
const hamburguesa2 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa3 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa4 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa5 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa6 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa7 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa8 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa9 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa10 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa11 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)
const hamburguesa12 = new Hamburguesa("plaplap", "plapalpal", 1100, 50)

let hamburguesas = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4, hamburguesa5, hamburguesa6, hamburguesa7,hamburguesa8, hamburguesa9, hamburguesa10, hamburguesa11, hamburguesa12]

let carrito = []

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else{
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


let divHamburguesas = document.querySelector('#divHamburguesas')

hamburguesas.forEach( (hamburguesa, indice) => {
    divHamburguesas.innerHTML +=`
    <div class="card mb-3" id="hamburguesa${indice}">
    <h3 class="card-header">${hamburguesa.nombre}</h3>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <h6 class="card-subtitle text-muted">Support card subtitle</h6>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">
      <rect width="100%" height="100%" fill="#868e96"></rect>
      <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
    </svg>
    <div class="card-body">
      <p class="card-text">${hamburguesa.descripcion}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">$${hamburguesa.precio}</li>
      <li class="list-group-item">${hamburguesa.stock}</li>
      <li class="list-group-item"></li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
    <div class="card-footer text-muted">
      2 days ago
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Card title</h4>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button id="boton${indice}" class="btn btn-dark">Agregar al carrito</button>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
    `
})



hamburguesas.forEach((hamburguesa, indice ) => {
    document.querySelector(`#boton${indice}`).addEventListener('click', () =>{
        console.log(document.querySelector(`#hamburguesa${indice}`))
        let hamburguesaCarrito = hamburguesas[indice]
        carrito.push(hamburguesaCarrito)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    })


    /*
    fetch(hamburguesas.json')
    .then(response => response.json())
    .then(hamburguesas => {
      hamburguesas.forEach( (hamburguesa, indice) => {
    divHamburguesas.innerHTML +=`
    <div class="card mb-3" id="hamburguesa${indice}">
    <h3 class="card-header">${hamburguesa.nombre}</h3>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <h6 class="card-subtitle text-muted">Support card subtitle</h6>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">
      <rect width="100%" height="100%" fill="#868e96"></rect>
      <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
    </svg>
    <div class="card-body">
      <p class="card-text">${hamburguesa.descripcion}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">$${hamburguesa.precio}</li>
      <li class="list-group-item">${hamburguesa.stock}</li>
      <li class="list-group-item"></li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
    <div class="card-footer text-muted">
      2 days ago
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Card title</h4>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button id="boton${indice}" class="btn btn-dark">Agregar al carrito</button>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
    `
})
    })
    */ 