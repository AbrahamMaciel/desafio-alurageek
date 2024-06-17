async function listProducts() {
  try {
    const url = "http://localhost:3000/productos";
    const connection = await fetch(url);

    const parsedConnection = connection.json();
    return parsedConnection;
  } catch (e) {
    console.error("Hubo un problema listando productos", e);
  }
}

async function uploadProduct(nombre, precio, imagen) {
  const url = "http://localhost:3000/productos";
  const connection = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    }),
  });

  const parsedConnection = connection.json();

  if (!connection.ok) {
    throw new Error("Hubo un problema subiendo productos");
  }

  return parsedConnection;
}

export const apiConnection = {
  listProducts,
  uploadProduct,
};
