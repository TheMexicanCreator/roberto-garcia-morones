const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://usuario:contraseña@cluster0.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => console.error("Error de conexión:", err));

module.exports = mongoose;
