"use client";

import React, { useState, useRef } from 'react';
import { 
  ShoppingBag, LayoutDashboard, Store, X, 
  ArrowRight, Heart, Sparkles, Plus, Play, Info,
  Mail, Lock, Send, Phone, MapPin, Trash2, Camera, LogOut, CheckCircle2
} from 'lucide-react';

// --- TYPES ---
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

type Tab = 'home' | 'collections' | 'about' | 'contact' | 'dashboard' | 'login' | 'checkout';

export default function AlishbaFatimaVIP() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 5 DEFAULT PREMIUM FLOWERS ---
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Midnight Velvet Rose", price: "85", category: "Luxury", image: "https://images.unsplash.com/photo-1550301164-941785984627?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Sunrise Tulip Mix", price: "45", category: "Bouquets", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Royal Crystal Orchid", price: "150", category: "Exotic", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "White Lily Essence", price: "65", category: "Elegant", image: "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Pink Peony Dream", price: "95", category: "Premium", image: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?auto=format&fit=crop&q=80&w=800" },
  ]);

  // Form State
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // --- HANDLERS ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newName || !newPrice || !tempImage) return alert("Details missing!");
    const newItem: Product = { id: Date.now(), name: newName, price: newPrice, category: "New", image: tempImage };
    setProducts([newItem, ...products]);
    setNewName(""); setNewPrice(""); setTempImage(null);
  };

  const deleteProduct = (id: number) => setProducts(products.filter(p => p.id !== id));

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('checkout');
  };

  return (
    <div className="min-h-screen bg-[#fafbff] text-slate-900 selection:bg-rose-200">
      
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-175 h-175 bg-rose-200/40 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-150 h-150 bg-blue-100/50 blur-[110px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/40 px-6 md:px-12 py-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold rotate-6 shadow-lg shadow-slate-200">AF</div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">Alishba Fatima <span className="text-rose-500">Studio</span></h1>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-white/90 px-8 py-2.5 rounded-full border border-slate-100 shadow-sm">
          {['Home', 'Collections', 'About', 'Contact'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item.toLowerCase() as Tab)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === item.toLowerCase() ? 'text-rose-500' : 'text-slate-400 hover:text-slate-900'}`}>{item}</button>
          ))}
        </div>

        <button onClick={() => isLoggedIn ? setActiveTab('dashboard') : setActiveTab('login')}
          className={`p-3 rounded-2xl border transition-all ${activeTab === 'dashboard' || activeTab === 'login' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-white text-rose-500'}`}>
          <LayoutDashboard size={20} />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-in fade-in duration-1000">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-rose-100"><Sparkles size={14} /> Luxury Collection 2026</div>
              <h2 className="text-7xl md:text-8xl font-black leading-[0.95] tracking-tighter">Pure Elegance <br/> <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-orange-400 italic">By Alishba.</span></h2>
              <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">Hand-curated floral arrangements delivered with love and luxury.</p>
              <button onClick={() => setActiveTab('collections')} className="px-12 py-5 bg-slate-900 text-white rounded-4xl font-black shadow-2xl hover:bg-rose-500 transition-all flex items-center gap-4 group">Shop Now <ArrowRight className="group-hover:translate-x-2 transition-transform" /></button>
            </div>
            <div className="relative h-150 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
               <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1000" className="w-full h-full object-cover" alt="Hero" />
            </div>
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-10">
            <h2 className="text-5xl font-black italic tracking-tighter text-slate-900">Our <span className="text-rose-500">Pick</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((p) => (
                <div key={p.id} className="group bg-white rounded-[3.5rem] p-4 shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-rose-100">
                  <div className="h-96 rounded-[3rem] overflow-hidden mb-6 relative">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={p.name} />
                  </div>
                  <div className="flex justify-between items-center px-6 pb-4">
                    <div><h4 className="font-black text-xl text-slate-800 tracking-tight">{p.name}</h4><p className="text-rose-500 font-black text-2xl">${p.price}</p></div>
                    <button onClick={() => handleBuy(p)} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-rose-500 transition-all shadow-xl"><Plus size={24}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checkout' && selectedProduct && (
          <div className="max-w-4xl mx-auto animate-in zoom-in duration-500">
            <div className="bg-white rounded-[4rem] shadow-2xl border border-rose-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="bg-slate-50 p-10 flex flex-col justify-center items-center text-center">
                <img src={selectedProduct.image} className="w-48 h-48 rounded-full object-cover border-8 border-white shadow-xl mb-6" alt="" />
                <h3 className="text-2xl font-black">{selectedProduct.name}</h3>
                <p className="text-rose-500 font-black text-3xl mt-2">${selectedProduct.price}</p>
              </div>
              <div className="p-12 space-y-6">
                {!orderSuccess ? (
                  <>
                    <h2 className="text-3xl font-black italic">Checkout</h2>
                    <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-rose-500 font-bold" />
                    <input type="text" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-rose-500 font-bold" />
                    <textarea placeholder="Delivery Address" rows={3} className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-rose-500 font-bold"></textarea>
                    <button onClick={() => setOrderSuccess(true)} className="w-full py-5 bg-rose-500 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-rose-600 transition-all">Place Order</button>
                    <button onClick={() => setActiveTab('collections')} className="w-full text-slate-400 font-bold text-sm">Cancel</button>
                  </>
                ) : (
                  <div className="text-center py-10 space-y-4">
                    <CheckCircle2 size={80} className="text-emerald-500 mx-auto" />
                    <h2 className="text-3xl font-black">Order Received!</h2>
                    <p className="text-slate-500 font-medium italic">Alishba will contact you soon.</p>
                    <button onClick={() => {setActiveTab('home'); setOrderSuccess(false)}} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Back to Home</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && isLoggedIn && (
          <div className="space-y-12 animate-in slide-in-from-right duration-700">
            <div className="flex justify-between items-center">
               <h2 className="text-5xl font-black italic tracking-tighter">Studio <span className="text-rose-500">Analytics</span></h2>
               <button onClick={() => setIsLoggedIn(false)} className="bg-rose-50 text-rose-500 px-8 py-3 rounded-2xl font-black">Logout</button>
            </div>
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl">
               <h3 className="text-2xl font-black mb-10 flex items-center gap-4"><Camera className="text-rose-500"/> Update Inventory</h3>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                 <input type="text" placeholder="Flower Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-5 bg-slate-50 rounded-3xl font-bold border-none outline-rose-500" />
                 <input type="number" placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full p-5 bg-slate-50 rounded-3xl font-bold border-none outline-rose-500" />
                 <button onClick={() => fileInputRef.current?.click()} className="w-full p-5 bg-rose-50 text-rose-500 rounded-3xl font-black flex items-center justify-center gap-3 border-2 border-dashed border-rose-200">
                   <Plus size={20}/> {tempImage ? "Ready" : "Upload PC Image"}
                 </button>
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
               </div>
               <button onClick={addProduct} className="mt-10 w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl hover:bg-rose-500 transition-all shadow-2xl">Publish</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-6">
                    <img src={p.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt="" />
                    <p className="font-black text-lg">{p.name} <span className="text-rose-500 ml-2">${p.price}</span></p>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="p-4 bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'login' && (
          <div className="max-w-md mx-auto py-20 animate-in zoom-in">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-rose-100 text-center">
              <div className="w-20 h-20 bg-rose-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40}/></div>
              <h2 className="text-3xl font-black italic">Admin Login</h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-bold text-center" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-bold text-center" />
                <button onClick={() => {if(email==="alishba@studio.com" && password==="alishba123") {setIsLoggedIn(true); setActiveTab('dashboard')} else alert("Wrong Pass!")}} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-rose-500 transition-all">Unlock</button>
              </div>
            </div>
          </div>
        )}

        {/* About & Contact */}
        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto text-center py-20 bg-white rounded-[4rem] shadow-xl border border-rose-50 px-12">
            <h2 className="text-5xl font-black italic mb-6">Alishba's <span className="text-rose-500">Legacy</span></h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic">"Hamari floral designs sirf flowers nahi, balki ehsasat hain." - Alishba Fatima</p>
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto text-center py-20 bg-slate-900 text-white rounded-[4rem] shadow-xl px-12">
            <h2 className="text-5xl font-black italic mb-6">Contact <span className="text-rose-400">Us</span></h2>
            <div className="space-y-4 font-bold text-lg">
              <p>📍 Luxury District, Lahore</p>
              <p>📞 +92 300 1234567</p>
              <p>📧 alishba@studio.com</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}