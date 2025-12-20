import React, { useState, useEffect } from "react";
import { fetchMenuByRestaurant, createMenuItem, updateMenuItem, deleteMenuItem } from "../services/Restaurant_service";

const restaurantId = 1;

const initialMenuItems = [
  { id: 1, name: "Spaghetti Carbonara", description: "Classic Roman pasta", price: 12.5, category: "Pasta" },
  { id: 2, name: "Cheeseburger", description: "Beef patty with cheese", price: 9.5, category: "Burgers" },
];

export default function VendorMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
        setMenuItems(initialMenuItems);
        setLoading(false);
      });
  };

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleCreate() {
    setForm({ name: "", description: "", price: "", category: "" });
    setEditing(null);
    setShowForm(true);
    setSelectedFile(null);
    setImagePreview(null);
  }

  function handleEdit(item) {
    setForm({ ...item });
    setEditing(item.id);
    setShowForm(true);
    setSelectedFile(null);
    const storedImage = localStorage.getItem(`menuItemImage_${item.id}`);
    setImagePreview(storedImage);
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
      const updatedItem = { ...menuData, available: true };
      updateMenuItem(restaurantId, editing, updatedItem)
        .then(() => {
          if (selectedFile) {
            convertToBase64(selectedFile).then(base64 => {
              localStorage.setItem(`menuItemImage_${editing}`, base64);
            });
          }
          loadMenuItems();
          setShowForm(false);
          setEditing(null);
          setSelectedFile(null);
          setImagePreview(null);
        })
        .catch(err => console.error("Update error:", err));
    } else {
      createMenuItem(restaurantId, menuData)
        .then(res => {
          const newItem = res.data;
          if (selectedFile) {
            convertToBase64(selectedFile).then(base64 => {
              localStorage.setItem(`menuItemImage_${newItem.id}`, base64);
            });
          }
          loadMenuItems();
          setShowForm(false);
          setSelectedFile(null);
          setImagePreview(null);
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
                <th className="p-2 text-center">Image</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Description</th>
                <th className="p-2 text-center">Price</th>
                <th className="p-2 text-center">Category</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => {
                const storedImage = localStorage.getItem(`menuItemImage_${item.id}`);
                const imgSrc = storedImage || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80';
                return (
                  <tr key={item.id} className="border-t">
                    <td className="p-2 text-center"><img src={imgSrc} alt={item.name} className="w-16 h-16 object-cover rounded mx-auto" /></td>
                    <td className="p-2 text-center">{item.name}</td>
                    <td className="p-2 text-center">{item.description}</td>
                    <td className="p-2 text-center">${item.price}</td>
                    <td className="p-2 text-center">{item.category}</td>
                    <td className="p-2 text-center">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(item)} className="text-purple-600 underline">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded px-3 py-2" />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-slate-600 mb-2">Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
              </div>
            )}
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform">
            {editing ? "Update Item" : "Create Item"}
          </button>
          <button type="button" onClick={() => { setShowForm(false); setEditing(null); setImagePreview(null); }} className="ml-2 text-slate-500 underline">Cancel</button>
        </form>
      )}
    </div>
  );
}
