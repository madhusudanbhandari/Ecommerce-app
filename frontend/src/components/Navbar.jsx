import { Link,useNavigate } from "react-router-dom";
import {useCart} from "../context/CartContext";
import { clearTokens,getAccessToken } from "../utils/auth";

function Navbar() {
    const {cartItems}=useCart();
    const navigate=useNavigate();


    const cartCount=cartItems.reduce((total,item)=>total+item.quantity,0);
    const isLoggedIn=!!getAccessToken();
    const handleLogout=()=>{
        clearTokens();
        navigate('/login');
    }

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">MyCart</Link>

            <div className="flex items-center gap-6">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="hover:text-gray-300">
                            Login
                        </Link>
                        <Link to="/register" className="hover:text-gray-300">
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>

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