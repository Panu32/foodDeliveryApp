import React, { useContext } from 'react'
import './Cart.css'
const Cart = () => {
  const {cartItems,food_list,removeFromCart} =useContext(StoreContext);

  return (
    <div>Cart</div>
  )
}

export default Cart