import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
const App = () => {
    const[showLogin,setShowlogin] = useState(false);

  return (
    <>
       
      {showLogin?<LoginPopup setShowlogin={setShowlogin}/>:<></>}
      
       <div className="app">
        <Navbar setShowlogin={setShowlogin}/>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        

       </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App