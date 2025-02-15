import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot"
import "./styles.css"; // Single CSS file for all components

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/products/get-products/')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <div>
        <h1>Product List</h1>
        <ul>
          {products.map(product => (
            <li key={product.product_id}>
              <img src= {product.imgs} alt="" />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
