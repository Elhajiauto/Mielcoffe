/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Instagram, 
  Mail, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Menu as MenuIcon,
  X,
  Star,
  Flower2
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Rose Petal Latte", price: "$6.50", category: "Coffee", image: "https://images.unsplash.com/photo-1541167760496-162955ed8a4f?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Lavender Cold Brew", price: "$6.00", category: "Iced Drinks", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Hibiscus Pastry", price: "$4.50", category: "Pastries", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Pistachio Macaron", price: "$3.00", category: "Pastries", image: "https://images.unsplash.com/photo-1558326567-93630f9a2e30?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Matcha Miel", price: "$5.50", category: "Iced Drinks", image: "https://images.unsplash.com/photo-1515822338988-151ecdfd4786?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Elderflower Espresso", price: "$5.00", category: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600" },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497933322477-911b33379201?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800",
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sophia Miller", text: "The most beautiful cafe I've ever visited. The rose latte is a must-try!", rating: 5 },
  { id: 2, name: "James Wilson", text: "A perfect spot for reading. The floral arrangements are stunning and the coffee is top-tier.", rating: 5 },
  { id: 3, name: "Emma Davis", text: "Instagram heaven! But beyond the looks, the pastries are genuinely delicious.", rating: 4 },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Flowers', href: '#flowers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white py-4'} border-b border-black/5`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-tight flex items-center gap-2">
          <span className="text-bloom-gold">MIEL COFFEE</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[13px] font-bold uppercase tracking-widest text-stone-600 hover:text-bloom-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="pill-button">
            Visit Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-stone-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className={isScrolled ? 'text-stone-800' : 'text-white'} /> : <MenuIcon className={isScrolled ? 'text-stone-800' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 flex flex-col items-center gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-stone-700 hover:text-bloom-pink"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-bloom-pink text-white px-8 py-3 rounded-full font-semibold">
              Visit Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="pt-[70px] min-h-screen bg-bloom-cream">
      <div className="grid lg:grid-cols-[1fr_400px] min-h-[calc(100vh-70px)]">
        {/* Main Hero Pane */}
        <div className="relative bg-bloom-pink overflow-hidden flex items-center p-12 lg:p-24">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000" 
              alt="Coffee shop interior" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-xl"
          >
            <span className="text-white italic font-serif text-xl mb-4 block">Since 2024</span>
            <h1 className="text-6xl md:text-8xl text-white font-serif mb-6 leading-[1.1]">
              Where Coffee <br />Meets <span className="italic">Flowers</span>
            </h1>
            <p className="text-white text-lg md:text-xl mb-10 leading-relaxed opacity-90">
              Experience the perfect blend of handcrafted specialty coffee and fresh seasonal blooms in our cozy boutique cafe.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="sharp-button">Explore Menu</button>
              <button className="outline-button">Our Story</button>
            </div>
          </motion.div>

          {/* Decorative Corner Element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-bloom-green rounded-tl-[120px] hidden md:flex flex-col items-center justify-center text-center p-6 shadow-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-bloom-gold mb-3 shadow-sm">★</div>
            <div className="font-serif text-xl text-emerald-900 mb-1">Fresh Weekly</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 opacity-70">Floral Arrangements</div>
          </div>
        </div>

        {/* High Density Sidebar */}
        <aside className="high-density-sidebar">
          {/* Today's Specials */}
          <div className="p-8 bg-white border-b border-black/5">
            <h2 className="text-bloom-gold uppercase tracking-widest text-sm font-bold mb-6">Today's Specials</h2>
            <div className="space-y-6">
              {[
                { name: "Rose Petal Latte", desc: "Espresso, steamed milk, rose syrup", price: "$6.50" },
                { name: "Lavender Cold Brew", desc: "Small-batch lavender blend", price: "$6.00" },
                { name: "Hibiscus Pastry", desc: "Home-baked floral delight", price: "$4.50" }
              ].map((special, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <div>
                    <div className="font-bold text-stone-800 group-hover:text-bloom-gold transition-colors">{special.name}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{special.desc}</div>
                  </div>
                  <div className="font-bold text-stone-900">{special.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Small Gallery Grid */}
          <div className="flex-1 p-4 grid grid-cols-2 gap-2 bg-stone-50">
            <div className="bg-bloom-pink rounded-xl p-4 flex items-end text-[10px] font-bold uppercase tracking-widest text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer">Gallery</div>
            <div className="bg-bloom-green rounded-xl p-4 flex items-end text-[10px] font-bold uppercase tracking-widest text-emerald-900 shadow-sm hover:opacity-90 transition-opacity cursor-pointer">Flowers</div>
            <div className="bg-stone-200 rounded-xl p-4 flex items-end text-[10px] font-bold uppercase tracking-widest text-stone-600 shadow-sm hover:opacity-90 transition-opacity cursor-pointer">Interiors</div>
            <div className="bg-white border border-stone-100 rounded-xl p-4 flex items-end text-[10px] font-bold uppercase tracking-widest text-stone-400 shadow-sm hover:opacity-90 transition-opacity cursor-pointer">Events</div>
          </div>

          {/* Quick Contact */}
          <div className="p-8 bg-white border-t border-black/5">
            <h2 className="text-bloom-gold uppercase tracking-widest text-sm font-bold mb-4">Visit Us</h2>
            <div className="text-sm space-y-2 text-stone-600 font-medium">
              <div>824 Floral Way, Brooklyn, NY</div>
              <div>Mon - Fri: 7:00 AM - 6:00 PM</div>
              <div>Sat - Sun: 8:00 AM - 7:00 PM</div>
              <div className="mt-4 inline-block font-bold border-b border-bloom-gold pb-1 text-stone-800 hover:text-bloom-gold cursor-pointer transition-colors">
                hello@mielcoffee.com
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-bloom-green/30 rounded-full blur-3xl z-0"></div>
          <img 
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1000" 
            alt="Floral coffee experience" 
            className="rounded-xl shadow-sm relative z-10 w-full aspect-[4/5] object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-bloom-ink mb-8 leading-tight">
            The Concept Behind <br /><span className="text-bloom-gold italic underline decoration-bloom-pink/30">Miel Coffee</span>
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed mb-6">
            We believe that the ritual of morning coffee should be as beautiful as it is delicious. Miel Coffee was born from a desire to blend the sensory delight of fresh botanicals with the rich, comforting aromas of specialty coffee.
          </p>
          <p className="text-stone-500 text-lg leading-relaxed mb-8">
            Every corner of our shop is curated with seasonal flowers, creating an ever-changing atmosphere that inspires creativity and calm.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-10 border-t border-black/5 pt-8">
            <div>
              <h3 className="text-bloom-gold font-serif text-3xl mb-1">2k+</h3>
              <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest">Happy Visitors</p>
            </div>
            <div>
              <h3 className="text-bloom-gold font-serif text-3xl mb-1">50+</h3>
              <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest">Flower Varieties</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Coffee', 'Iced Drinks', 'Pastries'];

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-bloom-cream px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Signature Menu</h2>
        <p className="text-stone-500 max-w-xl mx-auto">Discover our handcrafted beverages and artisanal treats, infused with floral notes and made with love.</p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                ? 'bg-bloom-pink text-white shadow-md scale-105' 
                : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-bloom-gold">
                  {item.price}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-bloom-pink font-semibold uppercase tracking-widest block mb-2">{item.category}</span>
                <h3 className="text-xl font-serif text-stone-800 mb-2">{item.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">Crafted with the finest organic ingredients and a hint of botanical essence.</p>
                <button className="w-full py-3 border border-stone-200 rounded-xl text-stone-700 font-semibold hover:bg-bloom-pink hover:text-white hover:border-bloom-pink transition-all">
                  Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const Flowers = () => {
  return (
    <section id="flowers" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-8">Boutique <span className="text-bloom-pink">Florals</span></h2>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Our in-house floral studio creates bespoke arrangements for daily gifting, weddings, and special events. We source the freshest seasonal stems to bring life to your space.
            </p>
            
            <ul className="space-y-4 mb-10 text-stone-700">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-bloom-pink/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-bloom-pink"></div>
                </div>
                Daily Signature Bouquets
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-bloom-pink/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-bloom-pink"></div>
                </div>
                Subscription Floral Deliveries
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-bloom-pink/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-bloom-pink"></div>
                </div>
                Bespoke Event Styling
              </li>
            </ul>

            <button className="bg-stone-800 text-white px-10 py-4 rounded-full font-semibold hover:bg-bloom-pink transition-all shadow-lg">
              Order Flowers
            </button>
          </motion.div>

          <div className="flex-1 order-1 lg:order-2 grid grid-cols-2 gap-4">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1516627145497-ae69688d2741?auto=format&fit=crop&q=80&w=600" 
              alt="Flower bouquet" 
              className="rounded-3xl w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              src="https://images.unsplash.com/photo-1519340333755-5072134dc23a?auto=format&fit=crop&q=80&w=600" 
              alt="Flower boutique" 
              className="rounded-3xl w-full aspect-square object-cover mt-8"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://images.unsplash.com/photo-1522673607200-1648835ace98?auto=format&fit=crop&q=80&w=600" 
              alt="Coffee and flowers" 
              className="rounded-3xl w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600" 
              alt="Florist workshop" 
              className="rounded-3xl w-full aspect-square object-cover mt-8"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section className="py-24 bg-bloom-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl font-serif mb-4">Inside the Miel</h2>
        <p className="text-stone-500">Capture the moments. Share your experience with #MielCoffee</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-[400px]">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="h-full relative overflow-hidden cursor-pointer"
          >
            <img 
              src={img} 
              alt={`Gallery ${idx}`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-bloom-pink/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Love from Our Community</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <motion.div 
              key={t.id}
              whileHover={{ y: -10 }}
              className="bg-bloom-cream p-10 rounded-3xl relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-bloom-gold text-bloom-gold" />
                ))}
              </div>
              <p className="text-stone-600 italic text-lg mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-bloom-pink rounded-full"></div>
                <div>
                  <h4 className="font-bold text-stone-800">{t.name}</h4>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-stone-900 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-bloom-pink font-semibold uppercase tracking-widest text-xs mb-4 block underline underline-offset-8">Contact Us</span>
            <h2 className="text-5xl font-serif mb-10">Say Hello or <br />Book a Table</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-bloom-pink w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Our Location</h4>
                  <p className="text-white/60 font-light">123 Botanical Avenue, Garden District<br />Floral City, FC 45012</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-bloom-pink w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Opening Hours</h4>
                  <p className="text-white/60 font-light">Mon - Fri: 07:00 AM - 08:00 PM<br />Sat - Sun: 08:00 AM - 09:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-bloom-pink w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">Phone & Email</h4>
                  <p className="text-white/60 font-light">(555) 123-4567<br />hello@mielcoffee.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-bloom-pink transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-bloom-pink transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border border-white/10 group">
            {/* Replace with real map embed or placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.018299103632!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed43f7210e30b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Miel Coffee Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="h-[70px] bg-bloom-cream border-t border-black/5 flex items-center justify-center font-bold text-[10px] text-stone-400 uppercase tracking-[3px] px-6">
      © 2024 MIEL COFFEE & FLOWERS. ALL RIGHTS RESERVED.
    </footer>
  );
};

export default function App() {
  return (
    <div className="antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Flowers />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
