import { Link } from "react-router-dom";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL ;

function ProductCard({ product }) {
  return (
<Link to={`/product/${product.id}`} className="block">
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <img
          src={`${BASEURL}${product.image}`}
          alt={product.name}
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-green-500 font-bold">${product.price}</p>
          <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        </div>
    </div>
</Link>
  );
}

export default ProductCard;