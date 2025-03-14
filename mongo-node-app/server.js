const express = require("express");
const Product = require("./models/Product");

const app = express();
app.use(express.json()); // Permite recibir JSON en las solicitudes

const PORT = process.env.PORT || 3000;

app.post("/products", async (req, res) => {
    try {
      const { name, price, stock } = req.body;
      const product = new Product({ name, price, stock });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto" });
    }
  });

  app.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  });

  app.get("/products/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  });

  app.put("/products/:id", async (req, res) => {
    try {
      const { name, price, stock } = req.body;
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, stock },
        { new: true }
      );
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  });

  app.delete("/products/:id", async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  