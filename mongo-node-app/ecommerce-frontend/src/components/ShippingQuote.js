import React, { useState } from "react";
import axios from "axios";

function ShippingQuote() {
  const [origin, setOrigin] = useState({ city: "", postalCode: "", country: "" });
  const [destination, setDestination] = useState({ city: "", postalCode: "", country: "" });
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
  const [quote, setQuote] = useState(null);
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
      const response = await axios.post("http://localhost:3000/quote", data, {
        headers: {
          "Authorization": "Bearer 8af188fb1b693a0f30ca40a2634208be6753d79e36e48bf5351cce83c324e9c0", // Usamos el token directamente o desde el localStorage
        }
      });
      setQuote(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la cotización:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cotización de Envío</h2>
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
          Obtener Cotización
        </button>
      </form>

      {/* Mostrar la cotización */}
      {loading && <div>Cargando cotización...</div>}
      {quote && (
        <div className="mt-4">
          <h4>Cotización del Envío:</h4>
          <pre>{JSON.stringify(quote, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ShippingQuote;
