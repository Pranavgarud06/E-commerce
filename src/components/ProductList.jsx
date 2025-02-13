import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
  axios.get("https://api.escuelajs.co/api/v1/products")
    .then((response) => {
      console.log("API Response:", response.data); // Log API response
      setProducts(response.data.slice(0, 20));
    })
    .catch((error) => console.error("Error fetching products:", error));
}, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
