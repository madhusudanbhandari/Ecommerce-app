import { Link } from "react-router-dom";
import {useCart} from "../context/CartContext";

function Navbar() {
    const {cartItems}=useCart();

    const cartCount=cartItems.reduce((total,item)=>total+item.quantity,0);

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">MyCart</Link>

            <Link to="/cart" className="relative">
            Cart 
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                </span>
            )}
            </Link>
        </nav>
    );
}
export default Navbar;