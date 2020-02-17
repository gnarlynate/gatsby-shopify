import React, {createContext, useState} from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: "plant-dyed-goods.myshopify.com",
  storefrontAccessToken: "a6e72da3a1161d69e5f460ad84c0638a"
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({children}) => {
  const addProductToCart = async (variantId) => {
    try {
      const newCheckout = await client.checkout.create()
      const lineItems = [{
        variantId,
        quantity: 1
      }]
      const addItems = await client.checkout.addLineItems(
        newCheckout.id,
        lineItems
      )
      console.log(addItems.webUrl)
      // Buy button functionality
      // window.open(addItems.webUrl, "_blank")
    } catch(e) {
      console.error(e)
    }
    
  }
  return (
    <StoreContext.Provider value={{
      ...defaultValues, 
      addProductToCart
    }}>
      {children}
    </StoreContext.Provider>
  )
}