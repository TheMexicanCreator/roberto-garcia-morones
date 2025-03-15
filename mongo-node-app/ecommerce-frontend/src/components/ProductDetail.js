import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import {ShippingForm} from "./components/ShippingForm.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Precio: ${product.price}</Card.Text>
          <Button variant="success" onClick={() => setShowForm(true)}>Comprar</Button>
        </Card.Body>
      </Card>
      {showForm && <ShippingForm productId={product._id} />}
    </Container>
  );
};

export default ProductDetail;
