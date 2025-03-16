const Product = require("./models/Product");  // Asegúrate de que la ruta sea correcta

require("dotenv").config();
const express = require("express");


const app = express();
app.use(express.json());

// Middleware para registrar las solicitudes y encabezados
app.use((req, res, next) => {
  console.log("Solicitando:", req.method, req.originalUrl);  // Muestra el método y la URL de la solicitud
  console.log("Encabezados de la solicitud:", req.headers);  // Muestra todos los encabezados de la solicitud
  next();  // Continúa con la siguiente función de middleware o la ruta
});

// Middlewares de rutas
app.use(express.json());  // Esto permite recibir JSON en las solicitudes

app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));

// Aumenta el límite de encabezado permitido
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use((req, res, next) => {
  console.log("Encabezados de la solicitud:", req.headers);
  next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
