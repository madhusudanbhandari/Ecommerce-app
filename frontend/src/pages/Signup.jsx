import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Signup(){
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
    const  [form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        password2:"",
    });
    const [msg,setMsg]=useState("");
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setMsg("");
        try{
            const response=await fetch(`${BASE}/register/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:form.username,
                    email:form.email,
                    password:form.password,
                    password2:form.password2,
                })
            });
            const data=await response.json();
            if(response.ok){
                navigate("/login");
            }else{
                setMsg("Registration failed");
            }
        }catch(error){
            setMsg("An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password2"
                            name="password2"
                            type="password"
                            placeholder="Confirm Password"
                            value={form.password2}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                {msg && <p className="text-red-500 text-sm mt-2">{msg}</p>}
                <div>
                    <p className="text-gray-600 text-sm mt-4">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login here</a></p>
                </div>
             </div>
         </div>
    );
             
       
    
}

export default Signup;

