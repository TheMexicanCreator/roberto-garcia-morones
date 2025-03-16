const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_TOKEN = "8b1913e7a48721bb5a11cf57cfe32f3bb311ef5c83fc767b45350d609b3058da";  // Reemplaza con tu token real

// Ruta para generar el envío
router.post("/shipping/create", async (req, res) => {
  try {
    const { productId, address, city, zip, phone, email, weight, dimensions } = req.body;

    const envioResponse = await axios.post("https://api.envia.com/shipping", {
      origin: { postalCode: "00000" },
      destination: { postalCode: zip },
      packages: [{ weight, height: 10, width: 10, length: 10 }],  // Puedes mejorar esto con dimensiones reales
      courier: "DHL"  // Se puede cambiar a "Estafeta"
    }, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    res.json({
      carrier: envioResponse.data.carrier,
      service: envioResponse.data.service,
      trackingNumber: envioResponse.data.tracking_number,
      trackUrl: envioResponse.data.tracking_url,
      label: envioResponse.data.label_url
    });
  } catch (error) {
    res.status(500).json({ message: "Error al generar el envío" });
  }
});

// Ruta para obtener la cotización
router.post("/shipping/quote", async (req, res) => {
  const { origin, destination, weight, dimensions } = req.body;

  try {
    // Configura los parámetros para la solicitud a Envia.com
    const response = await axios.post("https://api.envia.com/quote", {
      origin,
      destination,
      weight,
      dimensions,
    }, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      }
    });

    // Devuelve la cotización obtenida desde Envia.com
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
    res.status(500).json({ error: "Error al obtener la cotización" });
  }
});

module.exports = router;
