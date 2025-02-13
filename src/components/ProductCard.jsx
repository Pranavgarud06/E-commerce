import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-black/10 backdrop-blur-md shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Product Image */}
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.title}
        className="w-full h-56 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 text-black">
        <h3 className="text-xl font-bold truncate">{product.title}</h3>
        <p className="text-lg font-semibold text-black mt-1">${product.price}</p>

        {/* View Details Button */}
        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-block w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center px-5 py-3 rounded-lg font-medium transition hover:opacity-80"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

