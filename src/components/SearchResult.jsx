import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../Assets/back1.webp"; 

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        const filteredProducts = response.data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      })
      .catch(() => setError("Failed to fetch products."))
      .finally(() => setLoading(false));
  }, [query]);

  if (!query) {
    return <p className="text-center text-gray-600 mt-8">Enter a search term to find products.</p>;
  }

  return (
    <div className="mt-15 min-h-screen max-w-screen mx-auto p-6  bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Results for "{query}"</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {products.length === 0 && !loading && (
        <p className="text-center text-gray-600">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
