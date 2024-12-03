import React, { createContext, useState, useEffect } from 'react';

// create context
export const CartContext = createContext()

const CartProvider = ({ children }) => {

  // cart state
  const [cart, setCart] = useState([])

  // item amount state
  const [itemAmount, setItemAmount] = useState(0)

  // Total price state
  const [total, setTotal] = useState(0)

  // total price update
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount
    }, 0)
    setTotal(total)
  })
  

  // update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount
      }, 0)
      setItemAmount(amount)
    }
  }, [cart])


  // add to cart
  const addToCart = (Product, id) => {
    const newItem = { ...Product, amount: 1 }
    // check if the item is already in the cart
    const cartItem = cart.find(item => {
      return item.id === id
    })
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 }
        } else {
          return item;
        }
      })
      setCart(newCart)
    } else {
      setCart([...cart, newItem])
    }
  }

  // remove cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart)
  }

  // clear cart
  const clearCart = () => {
    setCart([])
  }

  const increaseAmount = (id) => {
    const CartItem = cart.find((item) => item.id === id)
    addToCart(CartItem, id)
  }

  // descrease amount
  const descreaseAmount = (id) => {
    const CartItem = cart.find((item) => {
      return item.id === id;
    });
    if (CartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: CartItem.amount - 1 }
        } else {
          return item;
        }
      })
      setCart(newCart)
    }
    if (CartItem.amount < 2) {
      removeFromCart(id)
    }
  }

  return <CartContext.Provider
    value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      increaseAmount,
      descreaseAmount,
      itemAmount,
      total,
    }}>
    {children}
  </CartContext.Provider>
};

export default CartProvider;
