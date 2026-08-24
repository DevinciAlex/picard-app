import { Routes, Route } from 'react-router'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Loyalty from './pages/Loyalty'
import Login from './pages/Login'
import History from './pages/History'
import Register from './pages/Register'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/loyalty" element={<Loyalty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  )
}

export default App
