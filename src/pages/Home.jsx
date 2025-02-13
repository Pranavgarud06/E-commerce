import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import backgroundImage from "../assets/back1.webp"; 

const Home = () => {
  const navigate = useNavigate();

  return (
   <div className="relative min-h-screen max-w-screen bg-cover bg-center flex flex-col items-center justify-start text-white p-10" style={{ backgroundImage: `url(${backgroundImage})` }}>
     <div className="absolute inset-0 bg-opacity-50"></div>

    {/* //   <div className="relative z-10 max-w-3xl text-center mt-12">
    //     <h1 className="text-6xl font-extrabold text-pink-300 mb-4">Fashion Sale</h1>
    //     <p className="text-xl text-yellow-300 mb-6">
    //       Get up to <span className="font-bold text-green-300">50% Off</span> on all items. Limited time only!
    //     </p>
        
    //     <div className="mt-6 space-x-4">
    //       <button onClick={() => navigate("/login")} className="px-6 py-3 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition shadow-lg">
    //         Login
    //       </button>
    //       <button onClick={() => navigate("/signup")} className="px-6 py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition shadow-lg">
    //         Sign Up
    //       </button>
    //     </div>
    //   </div> */}

      {/* Product Section */}
      <div className="relative z-10 w-full p-8 mt-16">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-grey to-black bg-clip-text text-transparent text-center mb-6">
  Latest Products
</h2>

        <ProductList />
      </div> 
    </div> 
  );
};

export default Home;
