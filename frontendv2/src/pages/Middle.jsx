function Middle(){
    return(
        <>
           <main className="max-w-6xl mx-auto px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
              Order Delicious<br />Food Online
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              Explore restaurant menus, place orders, and track deliveries.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Search for restaurants or cuisines"
              />
              <button className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md">
                Browse Restaurants
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-72 h-72 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17V7Z" stroke="#1f2937" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11H15" stroke="#1f2937" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="8.5" r="0.8" fill="#1f2937" />
                <circle cx="15.5" cy="8.5" r="0.8" fill="#1f2937" />
              </svg>
            </div>
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-800">Popular Restaurants</h2>
            <a href="#" className="text-sky-700 hover:underline">View All</a>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Pasta Place','Burger House','Sushi Spot'].map((title, i) => (
              <article key={title} className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm">
                <div className="text-lg font-semibold text-slate-800">{title}</div>
                <div className="text-sm text-slate-500 mt-1">{i===0? 'Italian' : i===1 ? 'Fast Food' : 'Japanese'}</div>
                <div className="mt-4 bg-slate-50 rounded-md h-32 flex items-center justify-center text-slate-400">
                  Image
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8">
          <h3 className="text-2xl font-semibold text-slate-800">How It Works</h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100">
              <div className="mx-auto w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">🔍</div>
              <h4 className="mt-4 font-medium">1. Browse</h4>
              <p className="text-sm text-slate-500 mt-2">Search for restaurants or cuisines</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100">
              <div className="mx-auto w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">🧾</div>
              <h4 className="mt-4 font-medium">2. Order</h4>
              <p className="text-sm text-slate-500 mt-2">Add items to your cart and place your order</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100">
              <div className="mx-auto w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">📍</div>
              <h4 className="mt-4 font-medium">3. Track</h4>
              <p className="text-sm text-slate-500 mt-2">Track your order status and deliveries</p>
            </div>
          </div>
        </section>

        <footer className="py-12 text-center text-slate-500">© {new Date().getFullYear()} MIU • Built with ❤️</footer>
      </main>
        </>
    )
}

export default Middle;