
import { Routes, Route, Router } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'

function App() {
    return (

        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path='/cart' element={<CartPage/>}/> 

        </Routes>
      
    )
}

export default App