// routes/quoteRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const ENVIA_API_KEY = "8b1913e7a48721bb5a11cf57cfe32f3bb311ef5c83fc767b45350d609b3058da";  // Reemplaza con tu token real

router.post("/quote", async (req, res) => {
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
        'Authorization': `Bearer ${ENVIA_API_KEY}`,  
      }
    });

    // Envía la cotización de vuelta al cliente
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener la cotización:", error);
    res.status(500).json({ error: "Error al obtener la cotización" });
  }
});

module.exports = router;
