import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/products/${id}/`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-500">Product not found</div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:text-blue-700 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="flex flex-col md:flex-row">

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={
                product.image?.startsWith("http")
                  ? product.image
                  : `${BASEURL}${product.image}`
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>

              <p className="text-green-500 text-2xl font-bold mb-4">
                ${Number(product.price).toFixed(2)}
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            
            <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 active:scale-95 transition-all duration-200"
              onClick={() => addToCart(product.id)}
            >
              🛒 Add to Cart
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;