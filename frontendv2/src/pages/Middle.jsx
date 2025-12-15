import React, { useEffect, useMemo, useState, useContext } from 'react';
import Filters from '../components/Filters';
import MenuCard from '../components/MenuCard';
import CartSidebar from '../components/CartSidebar';
import { CartContext } from '../components/CartContext';

function Middle() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('');

  const { addItem } = useContext(CartContext);

  // Load data — try API if configured, otherwise use mock data
  useEffect(() => {
    // Mock restaurants
    const mockRestaurants = [
      { id: 1, name: 'Pasta Place', cuisine: 'Italian', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { id: 2, name: 'Burger House', cuisine: 'Fast Food', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80' },
      { id: 3, name: 'Sushi Spot', cuisine: 'Japanese', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    ];

    // Mock menu items
    const mockMenu = [
      { id: 'm1', name: 'Spaghetti Carbonara', description: 'Classic Roman pasta', price: 12.5, category: 'Pasta', restaurantId: 1 },
      // { id: 'm2', name: 'Margherita Pizza', description: 'Tomato, mozzarella, basil', price: 10.0, category: 'Pizza', restaurantId: 1 },
      { id: 'm3', name: 'Cheeseburger', description: 'Beef patty with cheese', price: 9.5, category: 'Burgers', restaurantId: 2 },
      { id: 'm4', name: 'Fries', description: 'Crispy fries', price: 3.5, category: 'Sides', restaurantId: 2 },
      // { id: 'm5', name: 'Salmon Nigiri', description: 'Fresh salmon on rice', price: 4.0, category: 'Sushi', restaurantId: 2 },
      { id: 'm6', name: 'California Roll', description: 'Crab & avocado', price: 6.5, category: 'Sushi', restaurantId: 3 },
    ];

    setRestaurants(mockRestaurants);
    setMenuItems(mockMenu);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(menuItems.map(m => m.category));
    return Array.from(set);
  }, [menuItems]);

  const filtered = useMemo(() => {
    return menuItems.filter(m => {
      if (vendor && String(m.restaurantId) !== String(vendor)) return false;
      if (category && m.category !== category) return false;
      if (search && !(`${m.name} ${m.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [menuItems, vendor, category, search]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <section className="mb-6">
        <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow">Discover Menus</h1>
        <p className="text-slate-600 mt-2">Browse vendors and filter by categories. Add items to cart to checkout.</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Filters
            vendors={restaurants}
            categories={categories}
            selectedVendor={vendor}
            selectedCategory={category}
            onChange={(key, value) => {
              if (key === 'vendor') setVendor(value);
              if (key === 'category') setCategory(value);
            }}
            onSearch={(val) => setSearch(val)}
          />

          {/* Restaurant cards */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-slate-800">Popular Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {restaurants.map(r => (
                <div key={r.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <img src={r.img} alt={r.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <div className="font-bold text-lg text-slate-800">{r.name}</div>
                    <div className="text-slate-500 text-sm mt-1">{r.cuisine}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} onAdd={(it) => addItem({ ...it })} />
            ))}
            {filtered.length === 0 && <div className="col-span-full text-center text-slate-400 py-12">No menu items found.</div>}
          </div>
        </div>

        <div>
          <CartSidebar />
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500">© {new Date().getFullYear()} MIU • Built with ❤️</footer>
    </main>
  );
}

export default Middle;