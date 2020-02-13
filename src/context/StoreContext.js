import React, {createContext, useState} from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: "plant-dyed-goods.myshopify.com",
  storefrontAccessToken: "a6e72da3a1161d69e5f460ad84c0638a"
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {
    console.log('added to cart!')
  },
  client
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({children}) => {
  return (
    <StoreContext.Provider value={defaultValues}>
      {children}
    </StoreContext.Provider>
  )
}