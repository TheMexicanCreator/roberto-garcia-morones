import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import ShippingForm  from "./ShippingForm";

function ProductDetail() {
  const { id } = useParams(); // Obtenemos el id del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos la solicitud para obtener el producto por id
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProduct(response.data); // Guardamos el producto en el estado
        setLoading(false); // Cambiamos el estado de carga
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setLoading(false);
      });
  }, [id]); // El efecto se ejecuta cuando el id cambia

  const handleShippingSubmit = (shippingData) => {
    console.log("Datos del envío:", shippingData);
    // Aquí podrías enviar los datos a la API o almacenarlos en el estado global
  };

  if (loading) {
    return <div className="text-center">Cargando detalles...</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Detalles del Producto</h2>
      <div className="card">
        <img
          src="https://via.placeholder.com/150" // Aquí puedes agregar la imagen del producto
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Precio: ${product.price}</p>
          <p className="card-text">Stock: {product.stock}</p>
          <p className="card-text">{product.description}</p>
        </div>
      </div>
      {/* Agregamos el formulario de envío */}
      <ShippingForm onSubmit={handleShippingSubmit} />

    </div>



  );
};

export default ProductDetail;
