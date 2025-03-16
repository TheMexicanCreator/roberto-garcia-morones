import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import GenerateShipping from "./components/GenerateShipping";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la lista de productos */}
        <Route path="/products" element={<ProductList />} />
        {/* Ruta para el detalle del producto */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shipping/quote" element={<GenerateShipping />} />  {/* Ruta para cotización */}
        <Route path="/shipping/create" element={<GenerateShipping />} />  {/* Ruta para crear guía */}
      </Routes>
    </Router>
  );
}

export default App;
