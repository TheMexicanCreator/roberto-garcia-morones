import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const ShippingForm = ({ productId }) => {
  const [data, setData] = useState({ 
    name: "", address: "", city: "", zip: "", 
    phone: "", email: "", weight: "", dimensions: ""
  });
  const [quote, setQuote] = useState(null);
  const [shipment, setShipment] = useState(null);
  const API_TOKEN = "TU_TOKEN_DE_ENVIA";  // Reemplaza con tu token real

  const handleQuote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/shipping/quote", {
        productId,
        ...data
      });
      setQuote(response.data.price);
    } catch (error) {
      console.error("Error al obtener cotización:", error);
    }
  };

  const handleShipment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/shipping/create", {
        productId,
        ...data
      }, {
        headers: { Authorization: `Bearer ${API_TOKEN}` }
      });
      setShipment(response.data);
    } catch (error) {
      console.error("Error al generar el envío:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleQuote}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control type="text" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Código Postal</Form.Label>
          <Form.Control type="text" value={data.zip} onChange={(e) => setData({ ...data, zip: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Peso (kg)</Form.Label>
          <Form.Control type="number" value={data.weight} onChange={(e) => setData({ ...data, weight: e.target.value })} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Dimensiones (Largo x Ancho x Alto en cm)</Form.Label>
          <Form.Control type="text" value={data.dimensions} onChange={(e) => setData({ ...data, dimensions: e.target.value })} required />
        </Form.Group>
        <Button className="mt-3" type="submit">Cotizar Envío</Button>
      </Form>

      {quote && (
        <>
          <p className="mt-3">Costo del envío: ${quote}</p>
          <Button className="mt-2" variant="success" onClick={handleShipment}>Generar Envío</Button>
        </>
      )}

      {shipment && (
        <Alert className="mt-3" variant="info">
          <h5>Envío generado</h5>
          <p><strong>Carrier:</strong> {shipment.carrier}</p>
          <p><strong>Servicio:</strong> {shipment.service}</p>
          <p><strong>Número de Rastreo:</strong> {shipment.trackingNumber}</p>
          <p><strong><a href={shipment.trackUrl} target="_blank" rel="noopener noreferrer">Seguimiento aquí</a></strong></p>
          <p><strong>Etiqueta:</strong> <a href={shipment.label} target="_blank" rel="noopener noreferrer">Descargar</a></p>
        </Alert>
      )}
    </Container>
  );
};

export default ShippingForm;
