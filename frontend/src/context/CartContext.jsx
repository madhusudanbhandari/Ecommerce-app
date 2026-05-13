import { createContext, useContext, useState ,useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems]=useState([]);
    const [total, setTotal]=useState(0);

    const fetchCart=async()=>{
        try{
            const response=await fetch(`${BASEURL}/cart/`)
            if(!response.ok) {
                throw new Error("Failed to fetch cart");   
            }
            const data=await response.json();
            setCartItems(data.items || []);
            setTotal(data.total);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };
    useEffect(()=>{
        fetchCart();
    },[]);

    const addToCart=async(productId)=>{
        try {
            await fetch(`${BASEURL}/cart/add/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({product_id:productId}),
                
            });
            fetchCart();
           
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    
    
    const removeFromCart=async (itemId)=>{
        try{

            await fetch (`${BASEURL}/cart/remove/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({item_id:itemId}),
            });
            fetchCart();
        }catch(error){
            console.error('Error removing from the cart:',error);
        }
    }

    const updateQuantity=async(itemId,quantity)=>{
        if(quantity<1){
            await removeFromCart(itemId);
            return;
        }
        try{
            await fetch(`${BASEURL}/cart/update/`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({item_id:itemId,quantity}),
            });
            fetchCart();
        }catch(error){
        console.error("Error updating quantity:",error);
        }
    }
    const clearCart=async()=>{
        setCartItems([]);
        setTotal(0);
    }
       

    return(
        <CartContext.Provider value=
        {{cartItems,total,addToCart,removeFromCart,updateQuantity}}>
            {children}
        </CartContext.Provider>
    );

};

export const useCart=()=>{
    return useContext(CartContext);
}