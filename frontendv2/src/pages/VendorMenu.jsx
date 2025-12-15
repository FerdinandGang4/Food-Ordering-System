import React, { useState } from "react";

// Mock initial menu data
const initialMenus = [
  { id: 1, name: "Pasta Place", description: "Italian classics", cuisine: "Italian", address: "123 Main St" },
  { id: 2, name: "Burger House", description: "Best burgers in town", cuisine: "Fast Food", address: "456 Burger Ave" },
];

export default function VendorMenu() {
  const [menus, setMenus] = useState(initialMenus);
  const [editing, setEditing] = useState(null); // id or null
  const [form, setForm] = useState({ name: "", description: "", cuisine: "", address: "" });
  const [showForm, setShowForm] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleCreate() {
    setForm({ name: "", description: "", cuisine: "", address: "" });
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(menu) {
    setForm(menu);
    setEditing(menu.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    setMenus(menus => menus.filter(m => m.id !== id));
    if (editing === id) setShowForm(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      setMenus(menus => menus.map(m => m.id === editing ? { ...form, id: editing } : m));
    } else {
      setMenus(menus => [...menus, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Vendor Menu Management</h2>
      <button onClick={handleCreate} className="mb-4 bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">Create New Menu</button>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Your Menus</h3>
        {menus.length === 0 ? (
          <div className="text-slate-400">No menus yet.</div>
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-purple-50">
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Cuisine</th>
                <th className="p-2">Address</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map(menu => (
                <tr key={menu.id} className="border-t">
                  <td className="p-2">{menu.name}</td>
                  <td className="p-2">{menu.description}</td>
                  <td className="p-2">{menu.cuisine}</td>
                  <td className="p-2">{menu.address}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(menu)} className="text-purple-600 underline">Edit</button>
                    <button onClick={() => handleDelete(menu.id)} className="text-red-500 underline">Delete</button>
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
            <label className="block mb-1 font-medium">Cuisine</label>
            <input name="cuisine" required value={form.cuisine} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input name="address" required value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">
            {editing ? "Update Menu" : "Create Menu"}
          </button>
          <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="ml-2 text-slate-500 underline">Cancel</button>
        </form>
      )}
    </div>
  );
}
