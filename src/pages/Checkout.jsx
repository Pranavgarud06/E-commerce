import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/back1.webp"; 

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pin_code: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form inputs
  useEffect(() => {
    const { name, email, address, city, zip } = formData;
    setIsFormValid(name && email && address && city && zip && cart.length > 0);
  }, [formData, cart]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert("Order placed successfully!");
      clearCart();
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="mt-15 min-h-screen flex flex-col items-center p-6 bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Pin Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold mt-4">Order Summary</h2>
        <ul className="border rounded p-4 mb-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-2 rounded text-white ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
