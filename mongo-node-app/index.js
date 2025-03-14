const mongoose = require("mongoose");

// Reemplaza con tu cadena de conexión
const mongoURI = "mongodb+srv://rgarmor:hm7133XWFzhrG4Tn@ecartprueba.guaaq.mongodb.net/?retryWrites=true&w=majority&appName=EcartPrueba";

// Conexión a MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.error("Error al conectar:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
  });
  
  const User = mongoose.model("User", userSchema);
  
  // Guardar un nuevo usuario
  const newUser = new User({ name: "Juan", email: "juan@example.com" });
  newUser.save()
    .then(() => console.log("Usuario guardado"))
    .catch(err => console.error("Error al guardar usuario:", err));
  
