import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Assets/back1.webp"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state for invalid login
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before a new attempt
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ">
        <h1 className="text-3xl font-extrabold text-gray-500 mb-6">Login</h1>

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 text-sm animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required 
          />
          <button 
            type="submit" 
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 shadow-lg">
            Login
          </button >
        </form>

        <p className="p-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
          Don't have an account? 
          <span className="cursor-pointer text-yellow-900 underline ml-1" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
