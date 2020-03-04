import React, {useContext} from "react"
import {animated} from "react-spring"
import { StoreContext } from "../../context/StoreContext"
import RemoveFromCart from "./RemoveFromCart"

const Cart = ({style}) => {
  const { isCartOpen, checkout, toggleCartOpen, removeProductFromCart} = useContext(StoreContext)
  return (
    <animated.div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "40%",
        height: "100%",
        padding: 40,
        background: "white",
        zIndex: 1,
        boxShadow: "var(--elevation-4)",
        ...style
      }}
    >
      <button style={{
        background: 'var(--red)',
        position: 'absolute',
        top: 20,
        right: 20
        }}
        className='delete is-large' onClick={toggleCartOpen}>Close Cart</button>
      <h3 className='title'>Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id} style={{paddingBottom: 20}}>
          <img src={item.variant.image.src}
               style={{
                 height: '10%',
                 width: '10%',
                 float: 'left'
               }}
          />
          <RemoveFromCart variantId={item.id}/>
          <h4 className='title is-4'>{item.title}</h4>
          <p className='subtitle is-5'>$ {item.variant.price}</p>
          <p className='subtitle is-5'>Qty: {item.quantity}</p>

        </div>
      ))}
        <hr style={{
           backgroundColor: 'grey',
           height: 5,
           margin: '1rem 0'
         }}></hr>
      <h5 className='title'>Total: ${checkout.totalPrice}</h5>
    </animated.div>
  )
}

export default Cart