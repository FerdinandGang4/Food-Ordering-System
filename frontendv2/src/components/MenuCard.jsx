import React from 'react';

const foodImages = {
  'Spaghetti Carbonara': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  'Margherita Pizza': 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  'Cheeseburger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
  'Fries': 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80',
  'Salmon Nigiri': 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  'California Roll': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
};

export default function MenuCard({ item, onAdd }) {
  const storedImage = localStorage.getItem(`menuItemImage_${item.id}`);
  const img = storedImage || foodImages[item.name] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';
  return (
    <article className="bg-white rounded-xl border border-slate-100 p-0 shadow-md flex flex-col hover:shadow-lg transition-shadow duration-200">
      <img src={img} alt={item.name} className="w-full h-40 object-cover rounded-t-xl" />
      <div className="flex-1 p-4 flex flex-col">
        <div className="text-lg font-semibold text-slate-800">{item.name}</div>
        <div className="text-sm text-slate-500 mt-1">{item.description}</div>
        <div className="mt-3 text-xs text-slate-600 bg-slate-100 rounded px-2 py-1 w-fit">{item.category}</div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold text-purple-700">${item.price?.toFixed(2) ?? '0.00'}</div>
          <button onClick={() => onAdd(item)} className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-md shadow hover:scale-105 transition-transform">Add</button>
        </div>
      </div>
    </article>
  );
}
