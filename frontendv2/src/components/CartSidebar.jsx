
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';


export default function CartSidebar() {
  const { cart, removeItem, updateQuantity, total } = useContext(CartContext);
  const navigate = useNavigate();

  function handleCheckout() {
    navigate('/checkout');
  }

  return (
    <aside className="w-full sm:w-96 bg-gradient-to-br from-purple-50 to-white rounded-2xl border p-6 shadow-lg sticky top-8">
      <h4 className="text-xl font-bold text-purple-800 mb-4">Your Cart</h4>
      <div className="space-y-4">
        {cart.length === 0 && <div className="text-sm text-slate-400">Cart is empty</div>}
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
            <div>
              <div className="font-medium text-slate-800">{item.name}</div>
              <div className="text-xs text-slate-500">${item.price?.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))} className="w-14 border rounded px-2 py-1 text-center" />
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline text-xs">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 flex items-center justify-between">
        <div className="font-semibold text-slate-700">Total</div>
        <div className="font-bold text-lg text-purple-700">${total().toFixed(2)}</div>
      </div>
      <div className="mt-6">
        <button onClick={handleCheckout} disabled={cart.length===0} className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform disabled:opacity-50">Checkout</button>
      </div>
    </aside>
  );
}
