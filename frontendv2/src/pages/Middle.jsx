import React, { useEffect, useMemo, useState, useContext } from 'react';
import Filters from '../components/Filters';
import MenuCard from '../components/MenuCard';
import CartSidebar from '../components/CartSidebar';
import { CartContext } from '../components/CartContext';
import axios from 'axios';
import { fetchRestaurants, fetchMenuByRestaurant } from '../services/Restaurant_service';

function Middle() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('');

  const { addItem } = useContext(CartContext);

  // Load data — try API if configured, otherwise use mock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRestaurants();
        // Add default images if not provided by backend
        const defaultImages = [
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80'
        ];
        const restaurantsWithImages = response.data.map((r, index) => ({
          ...r,
          img: r.img || defaultImages[index % defaultImages.length]
        }));
        setRestaurants(restaurantsWithImages);

        // Fetch menus for all restaurants
        const allMenus = [];
        for (const r of restaurantsWithImages) {
          try {
            const menuRes = await fetchMenuByRestaurant(r.id);
            const menus = Array.isArray(menuRes.data) ? menuRes.data.map(item => ({ ...item, restaurantId: r.id })) : [];
            allMenus.push(...menus);
          } catch (err) {
            console.error(`Error fetching menu for restaurant ${r.id}:`, err);
          }
        }
        setMenuItems(allMenus);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
       
      }
    };

    fetchData();
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