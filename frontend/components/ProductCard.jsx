function ProductCard({ product }) {
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <img src={product.image} alt={product.name}
      className="w-full h-56 object-cover rounded-lg mb-4" />
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

        <p className="text-green-500 font-bold">${product.price.toFixed(2)}</p>
    </div>
}

export default ProductCard;