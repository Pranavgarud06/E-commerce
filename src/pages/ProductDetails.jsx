import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/back1.webp"; 

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        console.log("Product Data:", response.data); // Debugging
        setProduct(response.data); // ✅ Fix: Set a single product
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to load product details.");
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      setShowModal(true); 
    } else {
      addToCart(product);
    }
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/login"); // Redirect to login page
  };

  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!product) return <p className="p-4 text-center text-gray-500">Loading...</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
       <div
  className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-pink-100/50 backdrop-blur-md shadow-xl rounded-lg w-[800px] h-[500px]"
>
  {/* Image Section */}
  <div className="w-full h-[250px] flex items-center justify-center">
    <img
      src={product?.images?.length > 0 ? product.images[0] : "/placeholder.jpg"}
      alt={product?.title ?? "Product Image"}
      className="w-full h-full object-cover rounded-lg shadow-md"
      onError={(e) => { e.target.src = "/placeholder.jpg"; }} 
    />
  </div>

  {/* Details Section */}
  <div className="w-full flex flex-col justify-between h-[250px] text-white">
    <h1 className="text-xl text-black font-bold truncate">{product.title}</h1>
    <p className="text-lg font-semibold text-black mt-2">${product.price}</p>
    <p className="text-black text-sm line-clamp-3">{product.description}</p>

    <button
      onClick={handleAddToCart}
      className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:opacity-80 transition"
    >
      Add to Cart
    </button>
  </div>
</div>

      {/* Modal for Login Prompt */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-bold text-gray-900">Login Required</h2>
            <p className="text-gray-600 mt-2">You need to log in to add items to the cart.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLoginRedirect}
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
