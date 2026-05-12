import { useCart } from "../context/CartContext";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  console.log(cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">Your cart is empty.</div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.title}</h2>

                    <p className="text-green-500 font-bold">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                        onClick={() => {
                        if (item.quantity === 1) {
                            removeFromCart(item.id);  // remove if quantity reaches 0
                         } else {
                                updateQuantity(item.id, item.quantity - 1);
                         }
                    }}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                 >
                   −
                </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              Total: ${Number(totalPrice).toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
