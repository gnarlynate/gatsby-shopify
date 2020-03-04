import React, {useContext} from 'react'
import {StoreContext} from '../../context/StoreContext'

const RemoveFromCart = ({variantId}) => {
  const { removeProductFromCart } = useContext(StoreContext)
  return (
    <button className='is-danger button is-small is-outlined'
    style={{
      float: 'right'
    }}
    onClick={()=> removeProductFromCart(variantId)}
    >
Remove
</button>
  )
}

export default RemoveFromCart