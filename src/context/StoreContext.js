import React, {createContext, useState, useEffect} from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: "plant-dyed-goods.myshopify.com",
  storefrontAccessToken: "a6e72da3a1161d69e5f460ad84c0638a"
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  client,
  checkout: {
    lineItems: []
  }
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({children}) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setCartOpen] = useState(false)

  const toggleCartOpen = () => {
    setCartOpen(!isCartOpen)
  }

  useEffect(()=>{
    initalizeCheckout()
  }, [])

  const initalizeCheckout = async () => {
    try {
      const isBrowser = typeof window != 'undefined'
      const currentCheckoutId = isBrowser 
        ? localStorage.getItem("checkout_id") 
        : null
      let newCheckout = null
      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      }else {
        newCheckout = await client.checkout.create()
        if(isBrowser){
          localStorage.setItem("checkout_id", newCheckout.id)
        }
      }
      setCheckout(newCheckout)
    }catch(e) {
      console.log(e)
    }
  }
  const addProductToCart = async (variantId) => {
    try {
      const lineItems = [{
        variantId,
        quantity: 1
      }]
      const newItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newItems)
      // console.log(addItems.webUrl)
      // Buy button functionality
      // window.open(addItems.webUrl, "_blank")
    } catch(e) {
      console.error(e)
    }
    
  }
  return (
    <StoreContext.Provider value={{
      ...defaultValues,
      checkout,
      addProductToCart,
      toggleCartOpen,
      isCartOpen
    }}>
      {children}
    </StoreContext.Provider>
  )
}