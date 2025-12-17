import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import { submitPayment } from "../services/Payment_service";

export default function Checkout() {
  const { cart, total, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvc: "",
    address: "",
  });
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Force re-render when cart updates by tracking it
  const cartTotal = total();

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setProcessing(true);
    setError(null);
    setMessage(null);

    const payload = {
      orderId: Date.now(),
      customerId: 0,
      customerEmail: form.email,
      amount: Number(cartTotal.toFixed(2)),
      currency: "YJD",
      paymentMethod: "CREDIT_CARD",
      nameOnCard: form.name,
      cardNumber: form.card,
      expiry: form.expiry,
      cvc: form.cvc,
      billingAddress: form.address,
    };

    try {
      await submitPayment(payload);
      setSuccess(true);
      setMessage("Payment successful! Your order is on the way.");
      clearCart();
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Checkout</h2>
      {message && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
          {error}
        </div>
      )}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <div className="text-slate-400">Your cart is empty.</div>
        ) : (
          <ul className="mb-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Name on Card</label>
          <input name="name" required value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Card Number</label>
          <input name="card" required value={form.card} onChange={handleChange} maxLength={19} pattern="[0-9 ]{13,19}" placeholder="1234 5678 9012 3456" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Expiry</label>
            <input name="expiry" required value={form.expiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">CVC</label>
            <input name="cvc" required value={form.cvc} onChange={handleChange} maxLength={4} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Billing Address</label>
          <textarea name="address" required value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={processing || cart.length === 0} className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform disabled:opacity-50 font-semibold">
          {processing ? "Processing..." : "Pay & Place Order"}
        </button>
      </form>
    </div>
  );
}
