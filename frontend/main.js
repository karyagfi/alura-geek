const endpoint = "http://localhost:3000/products"
const sectionProducts = document.querySelector('.products');
const form = document.getElementById('form');
const inputName = document.getElementById('input-name');
const inputPrice = document.getElementById('input-price');
const inputImage = document.getElementById('input-image');

function getProducts() {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => showProducts(data))
    .catch(error => showProducts([]))
}

getProducts()

function showProducts(products) {
  if (products.length <= 0) {
    sectionProducts.innerHTML = "<p>No hay productos registrados.</p>"
    return
  }

  let html = "<h1>MIS PRODUCTOS:</h1>"
  products.forEach(product => {
     html += `
      <article>
        <img src="${product.image}">
        <p>${product.name}</p>
        <div>
          <p>${product.price}</p>
          <button class="delete" onClick="deleteProduct('${product.id}')">
            <img src="./images/trash.svg" alt="">
          </button>
        </div>
      </article>
    `
  }); 
  sectionProducts.innerHTML = html
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = inputName.value
  const price = inputPrice.value
  const image = inputImage.value

  if (name === "" || price === "" || image === "") {
    alert("Todos los datos son obligatorios");
    return
  }

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, price, image})
  })
  .then(response => {
    if (response.ok) {
      alert("Producto agregado correctamente.")
    }
  })
  .catch(error => {
    alert('Error al agregar el producto: ', error.message);
    return
  });
})

function deleteProduct(id) {
  fetch(endpoint + "/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      alert('Producto eliminado correctamente');
    }
  })
  .catch(error => {
    alert('Error al eliminar el producto: ', error.message);
    return  
  });
}