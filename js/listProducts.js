import { apiConnection } from "./LinkAPI.js";

const listaProductos = document.querySelector("[data-lista-productos]");

export default function createCard(nombre, precio, imagen, id) {
  const productCard = document.createElement("div");
  productCard.className = "lista-productos__card";
  productCard.setAttribute("data-id", id);
  productCard.innerHTML = `
    <img class="card__img" src="${imagen}" />
    <div class="card__info">
        <p class="card__info__nombre">${nombre}</p>
        <div class="card__info__value">
        <p class="info__value">$${precio}</p>
        <img src="./img/trashIcon.png" class="info__trash-icon" />
        </div>
    </div>
    `;

  //Esto al parecer se llama Event Delegation
  //Medio que no me convence que la llamada al delete sea dentro de createCard me pregunto si se podra modularizar porque me quede con un deleteProduct.js vacio...
  productCard.addEventListener("click", async (event) => {
    event.preventDefault();
    
    if (event.target.className == "info__trash-icon") {
      const card = event.target.closest(".lista-productos__card");
      const idCard = event.target.closest(".lista-productos__card").dataset.id;

      try{
        await apiConnection.deleteProduct(idCard);
        card.remove();
      } catch(e){
        console.error("Hubo un problema eliminando productos", e);
      }
    }
  });

  return productCard;
}

async function listProducts() {
  const listAPI = await apiConnection.listProducts();

  listAPI.forEach((product) => {
    listaProductos.appendChild(
      createCard(product.nombre, product.precio, product.imagen, product.id)
    );
  });
}

listProducts();
