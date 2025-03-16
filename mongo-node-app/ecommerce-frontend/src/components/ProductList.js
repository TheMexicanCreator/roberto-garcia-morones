import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar el token de localStorage o desde algún estado global (como Redux o Context)
    const token = "8af188fb1b693a0f30ca40a2634208be6753d79e36e48bf5351cce83c324e9c0";  // Ajusta según cómo lo guardes


    // Realizar la solicitud a la API con el encabezado Authorization
    axios.get("http://localhost:3000/products", {
      headers: {
        'Authorization': `Bearer ${token}`,  // Asegúrate de que el token esté correcto
      }
    })
    .then(response => {
      setProducts(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error al obtener los productos:", error);
      setLoading(false);
    });
  }, []);  // Se ejecuta una vez cuando el componente se monta

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Lista de Productos</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="https://via.placeholder.com/150" // Aquí se puede poner la imagen del producto
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Precio: ${product.price}</p>
                  <p className="card-text">Stock: {product.stock}</p>
                  <a href={`/product/${product._id}`} className="btn btn-primary">
                    Ver Detalles
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
  
}

export default ProductList;
