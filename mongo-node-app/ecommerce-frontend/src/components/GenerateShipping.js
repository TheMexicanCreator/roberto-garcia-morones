import React, { useState } from "react";
import axios from "axios";

function GenerateShipping() {
  const [origin, setOrigin] = useState({ city: "", postalCode: "", country: "" });
  const [destination, setDestination] = useState({ city: "", postalCode: "", country: "" });
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
  const [shippingInfo, setShippingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Datos del paquete
    const data = {
      origin,
      destination,
      weight,
      dimensions,
    };

    try {
      const response = await axios.post("http://localhost:3000/shipping/create", data, {
        headers: {
          "Authorization": "Bearer 8b1913e7a48721bb5a11cf57cfe32f3bb311ef5c83fc767b45350d609b3058da", // Usar el token en el header
        }
      });
      setShippingInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al generar la guía de envío:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Generar Guía de Envío</h2>
      <form onSubmit={handleSubmit}>
        {/* Origen */}
        <div className="mb-3">
          <label htmlFor="originCity" className="form-label">Ciudad de Origen</label>
          <input
            type="text"
            className="form-control"
            id="originCity"
            value={origin.city}
            onChange={(e) => setOrigin({ ...origin, city: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="originPostalCode" className="form-label">Código Postal de Origen</label>
          <input
            type="text"
            className="form-control"
            id="originPostalCode"
            value={origin.postalCode}
            onChange={(e) => setOrigin({ ...origin, postalCode: e.target.value })}
            required
          />
        </div>

        {/* Destino */}
        <div className="mb-3">
          <label htmlFor="destinationCity" className="form-label">Ciudad de Destino</label>
          <input
            type="text"
            className="form-control"
            id="destinationCity"
            value={destination.city}
            onChange={(e) => setDestination({ ...destination, city: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="destinationPostalCode" className="form-label">Código Postal de Destino</label>
          <input
            type="text"
            className="form-control"
            id="destinationPostalCode"
            value={destination.postalCode}
            onChange={(e) => setDestination({ ...destination, postalCode: e.target.value })}
            required
          />
        </div>

        {/* Peso */}
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Peso (kg)</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        {/* Dimensiones */}
        <div className="mb-3">
          <label htmlFor="length" className="form-label">Longitud (cm)</label>
          <input
            type="number"
            className="form-control"
            id="length"
            value={dimensions.length}
            onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="width" className="form-label">Ancho (cm)</label>
          <input
            type="number"
            className="form-control"
            id="width"
            value={dimensions.width}
            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="height" className="form-label">Alto (cm)</label>
          <input
            type="number"
            className="form-control"
            id="height"
            value={dimensions.height}
            onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Generar Guía
        </button>
      </form>

      {/* Mostrar la guía de envío */}
      {loading && <div>Cargando guía de envío...</div>}
      {shippingInfo && (
        <div className="mt-4">
          <h4>Guía Generada:</h4>
          <pre>{JSON.stringify(shippingInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GenerateShipping;
