// // import React from "react";
// import ProductList from "../components/ProductList";

// const Home = () => {
//   return (
//     <div className="home">
//       <h2>Welcome to AI-Powered E-Commerce</h2>
//       <ProductList />
//     </div>
//   );
// };

// export default Home;

import  { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="Fashion">Fashion</option>
        <option value="Electronics">Electronics</option>
        <option value="Sports">Sports</option>
        <option value="Home & Living">Home & Living</option>
      </select>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;