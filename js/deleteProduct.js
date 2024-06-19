import { apiConnection } from "./LinkAPI.js";

const listaProductos = document.querySelector("[data-lista-productos]");

//Esto al parecer se llama Event Delegation
listaProductos.addEventListener("click", async (event) => {
  if (event.target.className == "info__trash-icon") {
    const card = event.target.closest(".lista-productos__card");
    const idCard = event.target.closest(".lista-productos__card").dataset.id;
    try {
      await apiConnection.deleteProduct(idCard);
      card.remove();
    } catch (e) {
      console.error("Hubo un problema eliminando productos", e);
    }
  }
});
