// import { Link } from "react-router-dom";

// function ProductDetails({product}){
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL ;

//     return (
//         <Link to={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
//             <img src={`${BASEURL}${product.image}`} alt={product.name}  className="w-full h-56 object-cover rounded-lg mb-4"/>
//             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//             <p className="text-green-500 font-bold">${product.price}</p>
//             <p className="text-gray-600">{product.description}</p>
//         </Link>

//     );
// }
// export default ProductDetails

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }
  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row gap-8"></div>
        <img
          src={`${BASEURL}${product.image}`}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
        />
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-green-500 text-2xl font-bold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
