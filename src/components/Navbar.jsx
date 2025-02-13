import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { ShoppingCart, LogOut, User, Search } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg p-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <img src="../assets/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-violet-700 transition">
            SHOPeZEE
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center bg-gray-200 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-gray-800 w-64 placeholder-gray-500"
          />
          <button type="submit">
            <Search size={20} className="text-gray-600 hover:text-gray-800 transition" />
          </button>
        </form>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Cart Icon with Badge */}
          {user ? (
            <Link to="/cart" className="relative">
              <ShoppingCart size={28} className="text-gray-900 hover:text-violet-700 transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          ) : (
            <div 
              className="relative cursor-not-allowed opacity-50" 
              title="Login to access cart"
            >
              <ShoppingCart size={28} className="text-gray-400" />
            </div>
          )}

          {/* User Profile or Login Button */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-900 font-medium hidden sm:inline">{user.name || "User"}</span>
              <button
                onClick={handleLogout}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition text-white ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                <LogOut size={20} />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700">
              <User size={20} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
