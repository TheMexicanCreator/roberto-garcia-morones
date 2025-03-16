const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://rgarmor:hm7133XWFzhrG4Tn@ecartprueba.guaaq.mongodb.net/?retryWrites=true&w=majority&appName=EcartPrueba";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión:", err));

module.exports = mongoose;

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión:", err));

module.exports = mongoose;
