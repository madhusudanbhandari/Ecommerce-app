import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [form,setForm]=useState({
        name:" ",
        address:"",
        phone:"",
        payment_method:"COD",
    });

    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState(null);

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
   const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true);
    setMessage(" ");
    
    try{
        const res= await fetch(`${BASEURL}/orders/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body: JSON.stringify(form),
        });
        const data=await res.json();

        if (res.ok){
            setMessage("Order Placed successfully");
            fetch(`${BASEURL}/cart/clear/`)
            clearCart();
            setTimeout(()=>{
                navigate("/");
            },2000);
        }else{
            setMessage(data.error || "Failed to place order");
        }
    }catch(error){
        setMessage("An error occurred while placing the order");
    }finally{
        setLoading(false);
    }}
    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2"
                    />
                    <textarea
                    name="address"
                    placeholder="Full Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className='w-full border rounded-lg p-2' />

                    <input type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2" />

                    <select name="payment_method"
                    value={form.payment_method}
                    onChange={handleChange}
                    className="w-full border rouned-lg p-2"
                    >
                    <option value="COD">Cash On Delivery</option>
                    <option value="CreditCart">Online Payment</option>
                    </select>

                    <button  
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {loading ? "Processing..": "Place Order"}
                    </button>
                    {message && (
                        <p className="text-center text-green-700 font-semibold mt-4">{message}</p>

                    )}
                </form>
            </div>
            
        </div>
    )



    
}
export default CheckoutPage;