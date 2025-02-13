import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../assets/back1.webp"; 

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div
      className="mt-15 min-h-screen flex flex-col items-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center ">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link 
            to="/" 
            className="text-blue-600 text-lg font-semibold mt-3 inline-block hover:underline"
          >
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center bg-white shadow-lg rounded-lg p-5 transition-transform transform">
              {/* Product Image */}
              <img 
                src={item.image || item.thumbnail} 
                alt={item.title} 
                className="w-24 h-24 object-cover border rounded bg-gray-100"
                onError={(e) => (e.target.style.display = "none")} 
              />

              {/* Product Details */}
              <div className="flex-1 ml-6">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-3 bg-gray-200 rounded-md w-fit px-2 py-1">
                  <button 
                    className="px-3 py-1 text-lg font-semibold text-gray-700 hover:text-white hover:bg-gray-800 rounded-md transition"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button 
                    className="px-3 py-1 text-lg font-semibold text-gray-700 hover:text-white hover:bg-gray-800 rounded-md transition"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>
              </div>

              {/* Remove Button */}
              <button 
                className="ml-6 text-red-500 font-bold hover:text-red-700 transition"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total & Actions */}
          <div className="mt-6 text-center bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">
              Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </h2>
            <div className="flex justify-center gap-6 mt-4">
              
              {/* Clear Cart Button */}
              <button 
                onClick={() => clearCart()}
                className="bg-red-500 text-white px-6 py-3 rounded-md text-lg font-semibold transition hover:bg-red-700"
              >
                Clear Cart
              </button>
              
              {/* Checkout Button */}
              <button 
                onClick={() => navigate("/checkout")}
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 
