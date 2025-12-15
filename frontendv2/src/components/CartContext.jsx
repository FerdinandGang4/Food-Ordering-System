import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addItem(item) {
    setCart((prev) => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(itemId) {
    setCart((prev) => prev.filter(i => i.id !== itemId));
  }

  function updateQuantity(itemId, qty) {
    setCart((prev) => prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i));
  }

  function clearCart() {
    setCart([]);
  }

  function total() {
    return cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
