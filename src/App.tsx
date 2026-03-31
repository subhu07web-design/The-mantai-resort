import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Instagram, 
  Facebook, 
  MessageCircle,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { cn } from './lib/utils';
import { RESTAURANT_INFO, MENU_ITEMS, REVIEWS, GALLERY_IMAGES } from './constants';
import { MenuItem, CartItem } from './types';

// --- Contexts ---
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
} | null>(null);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// --- Components ---

const Navbar = ({ onCartOpen, onReservationOpen }: { onCartOpen: () => void, onReservationOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="glass-nav px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl tracking-[0.15em] text-[#D32F2F] block leading-none">THE MANDAI</span>
            <span className="font-display text-2xl tracking-[0.4em] text-[#D32F2F] block mt-1">RESORT</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === link.path ? "text-accent border-b-2 border-accent" : "text-white/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={onReservationOpen} className="text-xs font-bold tracking-widest uppercase border border-accent/30 px-6 py-2 rounded-full text-accent hover:bg-accent hover:text-primary transition-all">
            Book Table
          </button>
          <button onClick={onCartOpen} className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={onCartOpen} className="relative p-2 text-white">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-accent/10 mt-3 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium p-2 rounded-lg",
                    location.pathname === link.path ? "bg-accent/10 text-accent" : "text-white/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => {
                  onReservationOpen();
                  setIsOpen(false);
                }} 
                className="btn-primary w-full py-4 text-sm tracking-widest uppercase mt-4"
              >
                Book a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-5xl font-display text-[#D32F2F] leading-none tracking-[0.15em]">THE MANDAI</span>
            <span className="text-2xl font-display text-[#D32F2F] mt-1 tracking-[0.4em]">RESORT</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Experience the authentic flavors of Assam in a warm, family-friendly environment. From our unlimited buffet to our serene outdoor seating, we offer a dining experience like no other.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Instagram size={20} /></a>
            <a href={`https://wa.me/${RESTAURANT_INFO.socials.whatsapp}`} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/menu" className="hover:text-white transition-colors">Our Menu</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-white/70 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="shrink-0 text-accent" />
              <span>{RESTAURANT_INFO.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="shrink-0 text-accent" />
              <span>{RESTAURANT_INFO.phone}</span>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="shrink-0 text-accent" />
              <span>{RESTAURANT_INFO.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
          <p className="text-white/70 text-sm mb-4">Subscribe to get special offers and menu updates.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-accent"
            />
            <button className="bg-accent text-primary p-2 rounded-lg hover:bg-accent/90 transition-colors">
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-center text-white/50 text-xs">
        <p>© 2026 THE MANDAI RESORT. All rights reserved. | Designed for Excellence</p>
      </div>
    </footer>
  );
};

const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      <a 
        href={`https://wa.me/${RESTAURANT_INFO.socials.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={32} />
      </a>
      <a 
        href={`tel:${RESTAURANT_INFO.phone}`}
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ onReservationOpen }: { onReservationOpen: () => void }) => {
  const { addToCart } = useCart();
  return (
    <div className="space-y-32 pb-32">
      <Helmet>
        <title>THE MANDAI RESORT | Best Family Restaurant in Assam</title>
        <meta name="description" content="Taste the authentic flavours of Assam at THE MANDAI RESORT. Unlimited buffet, outdoor seating, and family-friendly dining in Jorhatia." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://delivery.pixelbin.io/predictions/outputs/1d/sr/upscaleRestricted/019d43cd-df9c-7009-97be-eb2faa66d605/result_0.jpeg" 
            alt="THE MANDAI RESORT Ambience" 
            className="w-full h-full object-cover brightness-[0.65]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
          <div className="text-white space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 border border-accent/30 rounded-full text-accent text-xs font-bold tracking-[0.3em] uppercase bg-accent/5 backdrop-blur-sm"
            >
              The Ultimate Dining Destination
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-display tracking-tight leading-[0.85]"
            >
              TASTE THE <br />
              <span className="text-accent italic font-serif lowercase text-6xl md:text-8xl">authentic</span> <br />
              FLAVOURS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-serif italic"
            >
              "Where tradition meets luxury. Experience the soul of Assam on every plate."
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link to="/menu" className="btn-primary text-lg px-12">Order Now</Link>
              <button onClick={onReservationOpen} className="btn-secondary text-lg px-12">Book a Table</button>
              <Link to="/menu" className="btn-outline border-white/20 text-white hover:bg-white hover:text-primary text-lg px-12">View Menu</Link>
            </motion.div>
          </div>
          
          {/* Side Image Section - Temporarily Hidden as per request */}
          {/* 
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 luxury-border rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src="https://picsum.photos/seed/hero-side/800/1000" 
                alt="Signature Dish" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
          */}
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
          <div className="w-px h-12 bg-white/20"></div>
        </div>
      </section>

      {/* Highlights with Bento-ish Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-primary text-white p-12 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-accent/20 transition-colors"></div>
            <div className="relative z-10 space-y-6 max-w-md">
              <h3 className="text-4xl font-display tracking-wide">UNLIMITED BUFFET</h3>
              <p className="text-white/60 font-serif italic text-lg">"A feast for the senses. Indulge in our curated selection of over 50+ traditional and modern delicacies."</p>
              <Link to="/menu" className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all">
                EXPLORE BUFFET <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-accent p-12 rounded-[2.5rem] flex flex-col justify-between"
          >
            <Star className="text-primary" size={40} />
            <div className="space-y-4">
              <h3 className="text-3xl font-display text-primary">OUTDOOR DINING</h3>
              <p className="text-primary/70 text-sm font-medium">Dine under the stars in our serene garden area.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-4 bg-paper p-12 rounded-[2.5rem] border border-white/5 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">PRIME LOCATION</h3>
              <p className="text-white/50 text-sm">Heart of Jorhatia, easily accessible for all.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-8 bg-secondary text-white p-12 rounded-[2.5rem] flex items-center justify-between group"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-display">FAMILY FIRST</h3>
              <p className="text-white/60 text-sm max-w-xs">Dedicated spaces for family celebrations and kids' comfort.</p>
            </div>
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="text-accent" size={40} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes - Stylish Grid */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs">Chef's Recommendations</span>
              <h2 className="text-5xl md:text-6xl font-display text-white">SIGNATURE SELECTIONS</h2>
            </div>
            <Link to="/menu" className="text-accent font-bold border-b-2 border-accent pb-1 hover:text-white transition-colors">
              VIEW FULL MENU
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {MENU_ITEMS.slice(0, 4).map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group space-y-6"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-3xl relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button onClick={() => addToCart(item)} className="btn-secondary w-full py-3 text-sm shadow-2xl">ADD TO CART</button>
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-display text-2xl tracking-wide group-hover:text-accent transition-colors text-white">{item.name}</h3>
                  <div className="section-divider !my-2 !w-12"></div>
                  <p className="text-accent font-bold text-lg">₹{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-4 sm:px-8 bg-paper">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs">Find Us</span>
              <h2 className="text-5xl md:text-6xl font-display text-white">VISIT THE RESORT</h2>
              <p className="text-white/50 font-serif italic text-lg leading-relaxed">
                "Located in the heart of Jorhatia, our resort is a sanctuary of taste and tradition. Easily accessible and always welcoming."
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-xl text-white">ADDRESS</h4>
                  <p className="text-white/50 text-sm">{RESTAURANT_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-xl text-white">RESERVATIONS</h4>
                  <p className="text-white/50 text-sm">{RESTAURANT_INFO.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-sm tracking-[0.2em] font-bold uppercase"
              >
                Get Directions <ArrowRight size={20} />
              </a>
            </div>
          </div>

          <div className="h-[500px] luxury-border rounded-[3rem] overflow-hidden shadow-2xl relative group">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(RESTAURANT_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="THE MANDAI RESORT Location Map"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Testimonials - Immersive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-12">
            <div className="space-y-4">
              <div className="flex justify-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
              </div>
              <h2 className="text-5xl md:text-7xl font-display">GUEST EXPERIENCES</h2>
              <p className="text-white/50 font-serif italic text-xl">"A journey of a thousand flavours starts with a single bite."</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {REVIEWS.map((review, i) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 space-y-6 text-left"
                >
                  <div className="text-accent italic text-4xl font-serif">"</div>
                  <p className="text-white/80 font-serif leading-relaxed italic line-clamp-4">{review.comment}</p>
                  <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary font-bold">{review.name[0]}</div>
                    <div>
                      <p className="font-bold text-sm">{review.name}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">{review.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link to="/reviews" className="btn-outline border-white/20 text-white hover:bg-white hover:text-primary">
              SHARE YOUR STORY
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pb-32 space-y-32">
      <Helmet>
        <title>About Us | THE MANDAI RESORT Story</title>
      </Helmet>
      
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="https://res.cloudinary.com/duy2rot8s/image/upload/v1774965332/mantai_front_bannerimg_pbx0jr.webp" 
            alt="About THE MANDAI RESORT" 
            className="w-full h-full object-cover brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold tracking-[0.4em] uppercase text-xs"
          >
            Est. 2015
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-display text-white tracking-wide"
          >
            OUR STORY
          </motion.h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-accent font-serif italic text-2xl">A Legacy of Taste</h2>
            <h3 className="text-5xl md:text-6xl font-display text-white leading-tight">CRAFTING MEMORIES <br /> THROUGH FLAVOUR</h3>
          </div>
          <div className="space-y-8 text-white/70 leading-relaxed font-serif text-lg italic">
            <p>
              "The Mandai Resort was born from a passion for authentic Assamese cuisine and a desire to create a space where families could gather and share more than just a meal."
            </p>
            <p className="not-italic font-sans text-base text-white/50">
              Located in the heart of Jorhatia, we have grown from a small eatery to a beloved landmark for food enthusiasts. Our mission is simple: to provide high-quality, delicious food made with the freshest local ingredients, served with the warmth and hospitality that Assam is known for.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5">
            <div className="space-y-2">
              <p className="text-5xl font-display text-accent">300+</p>
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Happy Reviews</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-display text-accent">50+</p>
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase">Daily Specials</p>
            </div>
          </div>
        </div>
        <div className="relative luxury-border rounded-[3rem]">
          <img 
            src="https://res.cloudinary.com/duy2rot8s/image/upload/v1774965455/mantai_img_3_hd2clg.webp" 
            alt="THE MANDAI RESORT Experience" 
            className="rounded-[inherit] shadow-2xl transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-12 -left-12 bg-paper p-12 rounded-[2rem] hidden lg:block shadow-2xl border border-white/5">
            <p className="text-accent font-serif font-bold text-2xl italic leading-tight">"Quality is our <br /> secret ingredient."</p>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-32 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 h-full">
            {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white"></div>)}
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center relative z-10">
          {[
            { title: "OUR VISION", desc: "To be the most preferred family dining destination in Assam, known for our consistency and taste." },
            { title: "OUR MISSION", desc: "To serve authentic, healthy, and delicious food while maintaining the highest standards of hygiene." },
            { title: "OUR VALUES", desc: "Hospitality, Integrity, and Quality are the pillars that support everything we do at THE MANDAI RESORT." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-accent border border-white/10">
                <Star size={32} />
              </div>
              <h4 className="text-3xl font-display tracking-widest">{item.title}</h4>
              <p className="text-white/50 font-serif italic leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MenuPage = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Chinese', 'Indian', 'Combos', 'Snacks', 'Desserts', 'Beverages'];

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pb-32">
      <Helmet>
        <title>Menu | THE MANDAI RESORT - Authentic Assamese & Chinese</title>
      </Helmet>

      <section className="bg-primary text-white py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">Exquisite Flavours</span>
          <h1 className="text-7xl md:text-9xl font-display tracking-wide">OUR MENU</h1>
          <p className="text-white/50 max-w-xl mx-auto font-serif italic text-lg">"A curated collection of culinary masterpieces."</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 space-y-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all border",
                activeCategory === cat 
                  ? "bg-accent text-primary border-accent shadow-xl scale-110" 
                  : "bg-paper text-white/50 border-white/10 hover:border-accent/50 hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="card-luxury overflow-hidden group flex flex-col"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold text-accent tracking-widest uppercase z-10">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button onClick={() => addToCart(item)} className="btn-secondary w-full py-3 text-sm shadow-2xl">ADD TO CART</button>
                  </div>
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-display text-2xl tracking-wide text-white group-hover:text-accent transition-colors">{item.name}</h3>
                    <p className="text-white/50 text-xs leading-relaxed font-medium uppercase tracking-wider">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-2xl font-display text-accent">₹{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string|null>(null);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Food', 'Ambience', 'Outdoor'];

  const filteredImages = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <div className="pb-32">
      <Helmet>
        <title>Gallery | THE MANDAI RESORT Visual Experience</title>
      </Helmet>

      <section className="bg-primary text-white py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">Visual Journey</span>
          <h1 className="text-7xl md:text-9xl font-display tracking-wide">GALLERY</h1>
          <p className="text-white/50 max-w-xl mx-auto font-serif italic text-lg">"Capturing the essence of luxury and taste."</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16 space-y-20">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all border",
                filter === cat 
                  ? "bg-accent text-primary border-accent shadow-xl scale-110" 
                  : "bg-paper text-white/50 border-white/10 hover:border-accent/50 hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredImages.map((img, i) => (
            <motion.div
              layout
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square luxury-border rounded-[2rem] overflow-hidden cursor-pointer shadow-xl group"
              onClick={() => setSelectedImage(img.url)}
            >
              <img 
                src={img.url} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-accent transition-colors">
              <X size={48} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-full rounded-[2rem] shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const review = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="pb-32">
      <Helmet>
        <title>Reviews | What Guests Say About THE MANDAI RESORT</title>
      </Helmet>

      <section className="bg-primary text-white py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">Guest Experiences</span>
          <h1 className="text-7xl md:text-9xl font-display tracking-wide">REVIEWS</h1>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="text-7xl font-display text-accent">{RESTAURANT_INFO.rating}</div>
            <div className="space-y-2">
              <div className="flex text-accent gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} fill={i < 4 ? "currentColor" : "none"} size={24} />)}
              </div>
              <div className="text-xs font-bold tracking-widest text-white/50 uppercase">Based on {RESTAURANT_INFO.reviewsCount} reviews</div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div className="lg:col-span-2 space-y-12">
          {reviews.map((review) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={review.id} 
              className="bg-paper p-10 rounded-[2rem] shadow-xl border border-white/5 space-y-6 group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-display text-2xl tracking-wide text-white group-hover:text-accent transition-colors">{review.name}</h4>
                  <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase">{review.date}</p>
                </div>
                <div className="flex gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i < review.rating ? "currentColor" : "none"} size={18} />
                  ))}
                </div>
              </div>
              <p className="text-white/70 leading-relaxed font-serif italic text-lg">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-paper p-10 rounded-[2rem] shadow-2xl border border-white/5 sticky top-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full"></div>
            <h3 className="text-3xl font-display text-white mb-8">LEAVE A REVIEW</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newReview.name}
                  onChange={e => setNewReview({...newReview, name: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Rating</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: num})}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all border",
                        newReview.rating >= num 
                          ? "bg-accent text-primary border-accent shadow-lg scale-110" 
                          : "bg-white/5 text-white/20 border-white/10 hover:border-accent/30"
                      )}
                    >
                      <Star fill={newReview.rating >= num ? "currentColor" : "none"} size={20} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Your Experience</label>
                <textarea 
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={e => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg resize-none text-white"
                  placeholder="Tell us about your visit..."
                />
              </div>
              <button type="submit" className="btn-primary w-full py-5 text-sm tracking-[0.3em] font-bold uppercase">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: location.state?.subject || 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.firstName}! Your message regarding "${formData.subject}" has been sent.`);
    setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="pb-32">
      <Helmet>
        <title>Contact Us | THE MANDAI RESORT Jorhatia Assam</title>
      </Helmet>

      <section className="bg-primary text-white py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4"
        >
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-xs">Get in Touch</span>
          <h1 className="text-7xl md:text-9xl font-display tracking-wide">CONTACT</h1>
          <p className="text-white/50 max-w-xl mx-auto font-serif italic text-lg">"We are here to serve you with excellence."</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-10">
            <h2 className="text-5xl font-display text-white">REACH OUT</h2>
            <div className="space-y-10">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                  <MapPin size={28} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-2xl tracking-wide text-white">OUR LOCATION</h4>
                  <p className="text-white/50 font-serif italic text-lg">{RESTAURANT_INFO.address}</p>
                </div>
              </div>
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                  <Phone size={28} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-2xl tracking-wide text-white">PHONE NUMBER</h4>
                  <p className="text-white/50 font-serif italic text-lg">{RESTAURANT_INFO.phone}</p>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="inline-block text-accent font-bold text-xs tracking-widest uppercase border-b border-accent/30 hover:border-accent transition-all">Call Now</a>
                </div>
              </div>
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                  <Clock size={28} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-2xl tracking-wide text-white">OPENING HOURS</h4>
                  <p className="text-white/50 font-serif italic text-lg">{RESTAURANT_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[450px] luxury-border rounded-[3rem] overflow-hidden shadow-2xl">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(RESTAURANT_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="THE MANDAI RESORT Location"
              className="grayscale hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </div>
        </div>

        <div className="bg-paper p-12 rounded-[3rem] shadow-2xl border border-white/5 h-fit relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full"></div>
          <h3 className="text-4xl font-display text-white mb-10">SEND A MESSAGE</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">First Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                  placeholder="John" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Last Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                  placeholder="Doe" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                placeholder="john@example.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Subject</label>
              <select 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg appearance-none text-white"
              >
                <option className="bg-paper" value="General Inquiry">General Inquiry</option>
                <option className="bg-paper" value="Table Reservation">Table Reservation</option>
                <option className="bg-paper" value="Feedback">Feedback</option>
                <option className="bg-paper" value="Event Booking">Event Booking</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Message</label>
              <textarea 
                required
                rows={4} 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg resize-none text-white" 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full py-5 text-sm tracking-[0.3em] font-bold uppercase">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, startCheckout = false }: { isOpen: boolean, onClose: () => void, startCheckout?: boolean }) => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(startCheckout);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pin: ''
  });

  React.useEffect(() => {
    if (isOpen) {
      setIsCheckingOut(startCheckout);
    }
  }, [isOpen, startCheckout]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderDetails = {
        name: formData.name,
        fullName: formData.name,
        Name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        pin: formData.pin,
        product: cart.map(item => item.name).join(', '),
        quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
        price: total,
        paymentMethod,
        orderDate: new Date().toLocaleString()
      };

      // Send data to Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbwy5Cv1moDkY8KLoeVsKB5RKrWaEoKnZmQPtLAo6NMu2yVghxzJ9oauXfkeXH0GG-W4RQ/exec', {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors for simple redirects
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      // Since we use no-cors, we won't get a readable response, but we assume success if no error is thrown
      setOrderComplete(true);
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setIsCheckingOut(false);
        setFormData({ name: '', phone: '', email: '', address: '', city: '', pin: '' });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error placing your order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/80 z-[60] backdrop-blur-xl"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-paper z-[70] shadow-2xl flex flex-col border-l border-white/5"
          >
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-primary text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <h2 className="text-3xl font-display flex items-center gap-4 relative z-10">
                <ShoppingCart size={32} className="text-accent" /> YOUR CART
              </h2>
              <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors relative z-10"><X size={28} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center border border-accent/30"
                  >
                    <Star fill="currentColor" size={48} />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-display text-white">ORDER PLACED</h3>
                    <p className="text-white/40 font-serif italic text-lg">"Thank you for choosing excellence."</p>
                    <p className="text-accent/60 text-sm">Order details sent to restaurant.</p>
                  </div>
                </div>
              ) : isCheckingOut ? (
                <form onSubmit={handleCheckout} className="space-y-10">
                  <button 
                    type="button" 
                    onClick={() => setIsCheckingOut(false)}
                    className="text-white font-bold text-xs tracking-widest uppercase flex items-center gap-2 mb-8 hover:text-accent transition-colors"
                  >
                    <ChevronRight className="rotate-180" size={16} /> Back to Cart
                  </button>
                  <h3 className="text-3xl font-display text-white">CHECKOUT</h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                        placeholder="Your name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                        placeholder="+91 00000 00000" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                        placeholder="your@email.com" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">City</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                          placeholder="Your city" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Pin Code</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.pin}
                          onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                          className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg text-white" 
                          placeholder="000000" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Delivery Address</label>
                      <textarea 
                        required 
                        rows={2} 
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:outline-none focus:border-accent transition-colors font-serif italic text-lg resize-none text-white" 
                        placeholder="Your address"
                      ></textarea>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Payment Method</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          type="button"
                          onClick={() => setPaymentMethod('COD')}
                          className={cn(
                            "p-4 rounded-2xl border transition-all text-left space-y-1",
                            paymentMethod === 'COD' ? "bg-accent/10 border-accent text-accent" : "bg-white/5 border-white/10 text-white/50"
                          )}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest">Pay on Delivery</p>
                          <p className="text-lg font-display">COD</p>
                        </button>
                        <button 
                          type="button"
                          onClick={() => setPaymentMethod('UPI')}
                          className={cn(
                            "p-4 rounded-2xl border transition-all text-left space-y-1",
                            paymentMethod === 'UPI' ? "bg-accent/10 border-accent text-accent" : "bg-white/5 border-white/10 text-white/50"
                          )}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest">Pay with Apps</p>
                          <p className="text-lg font-display">UPI</p>
                        </button>
                      </div>
                      {paymentMethod === 'UPI' && (
                        <div className="p-4 bg-accent/5 rounded-xl border border-accent/20">
                          <p className="text-xs text-accent italic font-serif">"Scan QR or pay to restaurant UPI ID at delivery."</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-10 border-t border-white/5 space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-white/40 tracking-widest uppercase">Total Amount</span>
                      <span className="text-4xl font-display text-accent">₹{total}</span>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={cn(
                        "btn-primary w-full py-5 text-sm tracking-[0.3em] font-bold uppercase flex items-center justify-center gap-3",
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                </form>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <ShoppingCart size={80} className="text-white/5" />
                  <div className="space-y-2">
                    <p className="text-white/40 font-serif italic text-lg">"Your cart is awaiting your selection."</p>
                    <button onClick={onClose} className="text-accent font-bold text-xs tracking-widest uppercase border-b border-accent/30 hover:border-accent transition-all">Browse Menu</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex gap-6 items-center group"
                    >
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 luxury-border">
                        <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={item.name} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-display text-xl tracking-wide text-white">{item.name}</h4>
                        <p className="text-accent font-display text-lg">₹{item.price}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                        <Trash2 size={24} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {!isCheckingOut && !orderComplete && cart.length > 0 && (
              <div className="p-10 border-t border-white/5 bg-white/5 space-y-8">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-white/40 tracking-widest uppercase">Subtotal</span>
                  <span className="text-4xl font-display text-accent">₹{total}</span>
                </div>
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="btn-primary w-full py-5 text-sm tracking-[0.3em] font-bold uppercase"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ReservationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', phone: '', date: '', time: '', guests: '2' });
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/90 z-[100] backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-paper z-[110] shadow-2xl rounded-[3rem] border border-white/5 overflow-hidden"
          >
            <div className="p-12 space-y-8">
              {isSuccess ? (
                <div className="py-20 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center border border-accent/30 mx-auto"
                  >
                    <Star fill="currentColor" size={48} />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-display text-white uppercase tracking-widest">Advance Table Booked</h3>
                    <p className="text-white/40 font-serif italic text-lg">"We look forward to serving you."</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">Reservation</span>
                      <h2 className="text-5xl font-display text-white tracking-wide">BOOK A TABLE</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
                      <X size={32} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-white tracking-[0.2em] uppercase block">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-serif italic text-lg text-white placeholder:text-white/20" 
                          placeholder="Your name" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-white tracking-[0.2em] uppercase block">Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-serif italic text-lg text-white placeholder:text-white/20" 
                          placeholder="+91 00000 00000" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-white tracking-[0.2em] uppercase block">Date</label>
                        <input 
                          required 
                          type="date" 
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-serif italic text-lg text-white [color-scheme:dark]" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-white tracking-[0.2em] uppercase block">Time</label>
                        <input 
                          required 
                          type="time" 
                          value={formData.time}
                          onChange={e => setFormData({...formData, time: e.target.value})}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-serif italic text-lg text-white [color-scheme:dark]" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-white tracking-[0.2em] uppercase block">Guests</label>
                        <div className="relative">
                          <select 
                            value={formData.guests}
                            onChange={e => setFormData({...formData, guests: e.target.value})}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-serif italic text-lg text-white appearance-none cursor-pointer"
                          >
                            {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n} className="bg-paper text-white">{n} Guests</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                            <ChevronRight size={20} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary w-full py-6 text-sm tracking-[0.4em] font-bold uppercase disabled:opacity-50 shadow-xl shadow-accent/20"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Reservation"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MiniCart = ({ onOpen }: { onOpen: () => void }) => {
  const { cart, total } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    if (cart.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [cart.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
        >
          <div className="bg-accent text-primary p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-primary/10 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-primary text-accent w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
                  <ShoppingCart size={24} />
                </div>
                <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-accent">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 leading-none mb-1">Cart Total</p>
                <p className="font-display text-2xl">₹{total}</p>
              </div>
            </div>
            <button 
              onClick={onOpen}
              className="bg-primary text-white px-8 py-3 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-3 shadow-lg"
            >
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [startCheckout, setStartCheckout] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openCart = (checkout = false) => {
    setStartCheckout(checkout);
    setIsCartOpen(true);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Removed setIsCartOpen(true) to allow multiple selections
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <HelmetProvider>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar onCartOpen={() => openCart(false)} onReservationOpen={() => setIsReservationOpen(true)} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage onReservationOpen={() => setIsReservationOpen(true)} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingActions />
            <MiniCart onOpen={() => openCart(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} startCheckout={startCheckout} />
            <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
          </div>
        </Router>
      </CartContext.Provider>
    </HelmetProvider>
  );
}
