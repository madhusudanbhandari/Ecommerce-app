import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold mb-8 text-gray-800">🛒 Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-12 text-center">
                        <p className="text-gray-400 text-xl mb-4">Your cart is empty</p>
                        <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">

                       
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-4 p-4 ${
                                        index !== cartItems.length - 1 ? "border-b" : ""
                                    }`}
                                >
                                    
                                    <img
                                        src={`${BASEURL}${item.product_image}`}
                                        alt={item.product_name}
                                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                    />

                                    
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {item.product_name}
                                        </h2>
                                        <p className="text-green-500 font-bold">
                                            ${Number(item.product_price).toFixed(2)}  {/* ✅ fixed field */}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            Subtotal: ${(Number(item.product_price) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                           
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                if (item.quantity === 1) {
                                                    removeFromCart(item.id);
                                                } else {
                                                    updateQuantity(item.id, item.quantity - 1);
                                                }
                                            }}
                                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 font-bold text-lg"
                                        >
                                            −
                                        </button>

                                        <span className="w-8 text-center font-bold text-lg">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 font-bold text-lg"
                                        >
                                            +
                                        </button>
                                    </div>

            
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 text-sm font-medium ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary Box */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 text-lg">Total</span>
                                <span className="text-2xl font-bold text-gray-800">
                                    ${Number(total).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <Link
                                    to="/"
                                    className="flex-1 text-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium"
                                >
                                    ← Continue Shopping
                                </Link>
                                <Link
                                    to="/checkout"
                                    className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Proceed to Checkout →
                                </Link>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;