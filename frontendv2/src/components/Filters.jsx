import React from 'react';

export default function Filters({ vendors, categories, selectedVendor, selectedCategory, onChange, onSearch }) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
      <input
        placeholder="Search menu items"
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 rounded-lg border border-slate-200 px-4 py-2"
      />

      <select value={selectedVendor || ''} onChange={(e) => onChange('vendor', e.target.value)} className="rounded-lg border px-3 py-2">
        <option value="">All Vendors</option>
        {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
      </select>

      <select value={selectedCategory || ''} onChange={(e) => onChange('category', e.target.value)} className="rounded-lg border px-3 py-2">
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
