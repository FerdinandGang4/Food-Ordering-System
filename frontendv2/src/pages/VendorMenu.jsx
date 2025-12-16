import React, { useState, useEffect } from "react";
import { fetchMenuByRestaurant, createMenuItem, updateMenuItem, deleteMenuItem } from "../services/Restaurant_service";

// Assume restaurantId is 1 for now (in a real app, get from auth or props)
const restaurantId = 1;

// Mock initial menu data
const initialMenuItems = [
  { id: 1, name: "Spaghetti Carbonara", description: "Classic Roman pasta", price: 12.5, category: "Pasta" },
  { id: 2, name: "Cheeseburger", description: "Beef patty with cheese", price: 9.5, category: "Burgers" },
];

export default function VendorMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // id or null
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = () => {
    setLoading(true);
    fetchMenuByRestaurant(restaurantId)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching menu items:", err);
        setMenuItems(initialMenuItems); // fallback
        setLoading(false);
      });
  };

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleCreate() {
    setForm({ name: "", description: "", price: "", category: "" });
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(item) {
    setForm({ ...item });
    setEditing(item.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    deleteMenuItem(restaurantId, id)
      .then(() => loadMenuItems())
      .catch(err => console.error("Delete error:", err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const menuData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category
    };

    if (editing) {
      updateMenuItem(restaurantId, editing, menuData)
        .then(() => {
          loadMenuItems();
          setShowForm(false);
          setEditing(null);
        })
        .catch(err => console.error("Update error:", err));
    } else {
      createMenuItem(restaurantId, menuData)
        .then(() => {
          loadMenuItems();
          setShowForm(false);
        })
        .catch(err => console.error("Create error:", err));
    }
  }

  if (loading) return <p>Loading menu items...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Menu Item Management</h2>
      <button onClick={handleCreate} className="mb-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">Create New Menu Item</button>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Your Menu Items</h3>
        {menuItems.length === 0 ? (
          <div className="text-slate-400">No menu items yet.</div>
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-purple-50">
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Price</th>
                <th className="p-2">Category</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-purple-600 underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" required value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <input name="description" required value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input name="price" type="number" step="0.01" required value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input name="category" required value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">
            {editing ? "Update Item" : "Create Item"}
          </button>
          <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="ml-2 text-slate-500 underline">Cancel</button>
        </form>
      )}
    </div>
  );
}
