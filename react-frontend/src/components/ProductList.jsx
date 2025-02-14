// import React from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "AI Smartwatch", price: "$199" },
  { id: 2, name: "AI Phone", price: "$799" }
];

const ProductList = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <Link to={`/product/${product.id}`} className="btn">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
