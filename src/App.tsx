import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Phone
} from 'lucide-react';
import { PRODUCTS, Product } from './data';

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-stone-600 hover:text-brand-primary transition-colors"
                id="mobile-menu-btn"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">J</div>
                <span className="text-xl font-serif italic font-bold text-brand-primary tracking-tight">JamboShop</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === cat ? 'text-brand-primary underline underline-offset-8' : 'text-stone-500 hover:text-brand-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-stone-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-brand-primary transition-all">
                <Search size={18} className="text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-40 lg:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-stone-600 hover:text-brand-primary transition-colors"
                id="cart-btn"
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-serif italic font-bold text-brand-primary">Categories</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left py-3 px-4 rounded-xl text-lg font-medium transition-all ${
                      selectedCategory === cat ? 'bg-brand-primary/10 text-brand-primary' : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden bg-stone-900">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <span className="inline-block px-4 py-1 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                  New Collection 2026
                </span>
                <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-6 leading-tight">
                  Authentic Kenyan <br /> Craftsmanship
                </h1>
                <p className="text-lg text-stone-200 mb-8 max-w-lg">
                  Discover the finest selection of locally sourced products, from handcrafted leather to premium highland coffee.
                </p>
                <div className="flex gap-4">
                  <button className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 group">
                    Shop Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-serif italic font-bold text-stone-900 mb-2">Featured Products</h2>
              <p className="text-stone-500">Handpicked items just for you in {selectedCategory}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-stone-400">Showing {filteredProducts.length} results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-400 hover:text-red-500 transition-colors shadow-sm">
                        <Star size={18} />
                      </button>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                      >
                        <Plus size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-stone-900 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                      <span className="font-bold text-brand-primary">{formatPrice(product.price)}</span>
                    </div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">{product.category}</p>
                    <p className="text-sm text-stone-500 line-clamp-2">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-stone-100 rounded-full mb-6">
                <Search size={32} className="text-stone-300" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">No products found</h3>
              <p className="text-stone-500">Try adjusting your search or category filter.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-6 text-brand-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">J</div>
                <span className="text-xl font-serif italic font-bold text-white tracking-tight">JamboShop</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Bringing the spirit of Kenya to your doorstep. We pride ourselves on quality, authenticity, and supporting local artisans.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-brand-accent transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-brand-accent transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-brand-accent transition-colors">Shop All</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-brand-accent transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-primary w-full"
                />
                <button className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-secondary transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; 2026 JamboShop Kenya. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <Phone size={14} /> +254 700 000 000
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={24} className="text-brand-primary" />
                  <h2 className="text-xl font-bold text-stone-900">Your Cart</h2>
                  <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2 py-1 rounded-full">{cartCount} items</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag size={40} className="text-stone-200" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">Your cart is empty</h3>
                    <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-stone-900">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-stone-400 mb-3">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-stone-50 text-stone-600"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-bold text-stone-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-stone-50 text-stone-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-brand-primary">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-100 bg-stone-50">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-stone-500 text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-stone-500 text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-stone-900 font-bold text-lg pt-2 border-t border-stone-200">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-4 rounded-xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 group">
                    Checkout Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
