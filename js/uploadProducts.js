import { apiConnection } from "./LinkAPI.js";
import listProducts from './listProducts.js';

const form = document.querySelector("[data-form]");

async function createProduct(event) {
  event.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    await apiConnection.uploadProduct(nombre, precio, imagen);
  } catch (e) {
    console.error("Hubo un problema creando productos", e);
  }
}

form.addEventListener("submit", event => createProduct(event));
