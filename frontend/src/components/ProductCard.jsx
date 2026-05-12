function ProductCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL ;
    
    console.log(product.image);

    console.log(`${BASEURL}${product.image}`);

    return (
      
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">

            <img
                src= {`${BASEURL}${product.image}`}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
                {product.name}
            </h2>

            <p className="text-green-500 font-bold">
                ${product.price}
            </p>
        </div>
        
    );
}

export default ProductCard;