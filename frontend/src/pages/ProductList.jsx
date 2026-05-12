import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL ;

   useEffect(() => {
    const fetchProducts = async () => {
        try {
            console.log("Fetching started");

            const response = await fetch(
                "http://127.0.0.1:8000/products/"
            );

            console.log("Response received:", response);

            const data = await response.json();

            console.log("Data:", data);

            setProducts(data);
        } catch (error) {
            console.error("ERROR:", error);

            setError(error.message);
        } finally {
            console.log("Finished loading");

            setLoading(false);
        }
    };

    fetchProducts();
}, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }
    if(error) {
        return <div>Error:{error}  </div> ;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
                products.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                 />
                ))
            ) : (
                <div className="text-center mt-10">No products available.</div>
            )}
            </div>
        </div>
    );
}

export default ProductList;