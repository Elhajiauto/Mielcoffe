/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, createContext, useContext } from 'react';
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
  Star as StarIcon,
  Flower2,
  ShoppingCart,
  CheckCircle2,
  Calendar,
  Facebook,
  Twitter,
  Send
} from 'lucide-react';

// --- Context ---
const AppContext = createContext<{
  cartCount: number;
  addToCart: (item: string) => void;
  openModal: (type: 'booking' | 'contact') => void;
} | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  role: string;
  image: string;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  { 
    id: 1, 
    name: "Classic Miel Latte", 
    price: "$6.50", 
    category: "Coffee", 
    featured: true,
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a4f?auto=format&fit=crop&q=80&w=800",
    description: "Our signature espresso infused with local honey and organic milk."
  },
  { 
    id: 2, 
    name: "Lavender Cold Brew", 
    price: "$6.00", 
    category: "Iced Drinks", 
    featured: true,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800",
    description: "24-hour steeped brew with a delicate hint of French lavender."
  },
  { 
    id: 3, 
    name: "Pistachio Miel Macaron", 
    price: "$3.50", 
    category: "Pastries", 
    featured: true,
    image: "https://images.unsplash.com/photo-1558326567-93630f9a2e30?auto=format&fit=crop&q=80&w=800",
    description: "Light, airy shells filled with creamy pistachio and honey ganache."
  },
  { id: 4, name: "Rose Petal Tart", price: "$5.50", category: "Pastries", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", description: "Crispy tart with floral cream." },
  { id: 5, name: "Iced Honey Matcha", price: "$5.50", category: "Iced Drinks", image: "https://images.unsplash.com/photo-1515822338988-151ecdfd4786?auto=format&fit=crop&q=80&w=800", description: "Premium grade matcha with clover honey." },
  { id: 6, name: "Espresso Cortado", price: "$4.50", category: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", description: "Balanced cut of bold espresso and steamed milk." },
];

const SOCIAL_FEED = [
  "https://images.unsplash.com/photo-1497933322477-911b33379201?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600",
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Elena Kovac", role: "Food Critic", image: "https://i.pravatar.cc/150?u=elena", text: "Miel Coffee isn't just a cafe; it's a sensory sanctuary. The honey-infused latte is world-class." },
  { id: 2, name: "Marcus Thorne", role: "Digital Creator", image: "https://i.pravatar.cc/150?u=marcus", text: "The perfect workspace. Great lighting, incredible coffee, and a very professional atmosphere." },
  { id: 3, name: "Sarah Jennings", role: "Local Artist", image: "https://i.pravatar.cc/150?u=sarah", text: "A hidden gem. The boutique floral aspect makes every visit feel like a special occasion." },
];

// --- Sub-Components ---

const SectionTitle = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-miel-gold uppercase tracking-[0.2em] font-bold text-sm mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl text-miel-coffee leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      className="fixed bottom-8 left-1/2 -track-x-1/2 z-[100] bg-miel-coffee text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 premium-shadow"
    >
      <CheckCircle2 className="text-miel-green w-5 h-5" />
      <span className="text-sm font-semibold">{message}</span>
    </motion.div>
  );
};

const Modal = ({ type, onClose }: { type: 'booking' | 'contact', onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-miel-coffee transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {type === 'booking' ? (
            <>
              <SectionTitle title="Reserve a Table" subtitle="Book your moment" centered={false} />
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-stone-400">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-miel-cream rounded-xl focus:ring-2 focus:ring-miel-coffee transition-all outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-stone-400">Date</label>
                    <input type="date" className="w-full px-6 py-4 bg-miel-cream rounded-xl focus:ring-2 focus:ring-miel-coffee transition-all outline-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-stone-400">Time</label>
                    <input type="time" className="w-full px-6 py-4 bg-miel-cream rounded-xl focus:ring-2 focus:ring-miel-coffee transition-all outline-none" required />
                  </div>
                </div>
                <button type="submit" className="miel-btn-primary w-full py-5 text-lg">
                  Confirm Reservation
                </button>
              </form>
            </>
          ) : (
            <>
              <SectionTitle title="Get in Touch" subtitle="Let's connect" centered={false} />
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-stone-400">Email Address</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 bg-miel-cream rounded-xl focus:ring-2 focus:ring-miel-coffee transition-all outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-stone-400">Message</label>
                  <textarea placeholder="How can we help?" rows={4} className="w-full px-6 py-4 bg-miel-cream rounded-xl focus:ring-2 focus:ring-miel-coffee transition-all outline-none" required></textarea>
                </div>
                <button type="submit" className="miel-btn-primary w-full py-5 text-lg">
                  Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openModal } = useAppContext();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Flowers', href: '#flowers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container-wide flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-miel-coffee rounded-lg flex items-center justify-center text-white font-serif text-xl font-bold group-hover:scale-110 transition-transform">M</div>
          <span className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled ? 'text-miel-coffee' : 'text-stone-800'}`}>Miel Coffee</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {links.map(link => (
              <a key={link.name} href={link.href} className="text-xs uppercase font-bold tracking-[0.2em] text-stone-600 hover:text-miel-gold transition-colors">{link.name}</a>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-stone-200"></div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-miel-coffee hover:scale-110 transition-transform">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-miel-gold text-white text-[10px] flex items-center justify-center rounded-full font-bold">{cartCount}</span>
              )}
            </button>
            <button onClick={() => openModal('booking')} className="miel-btn-primary !px-6 !py-2 !text-xs !uppercase !tracking-widest">
              Reserve
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-miel-coffee" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map(link => (
                <a key={link.name} href={link.href} className="text-lg font-serif text-miel-coffee" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
              ))}
              <button onClick={() => { openModal('booking'); setIsMenuOpen(false); }} className="miel-btn-primary w-full">Reserve Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { openModal } = useAppContext();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-miel-cream">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <div className="absolute inset-0 bg-miel-beige/30 z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
          alt="Premium coffee bean"
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-miel-cream/10 to-miel-cream"></div>
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-miel-gold uppercase tracking-[0.4em] font-bold text-sm mb-6 block drop-shadow-sm">Artisan Collective</span>
            <h1 className="text-6xl md:text-8xl text-miel-coffee leading-[1.05] mb-8">
              Where Coffee <br /> Meets <span className="italic relative">
                Craft
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-miel-pink/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
              </span>
            </h1>
            <p className="text-stone-500 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
              A cozy place for handcrafted specialty coffee and fresh seasonal blooms. Experience the art of slow living in the heart of the city.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href="#menu" className="miel-btn-primary w-full sm:w-auto text-center">View Menu</a>
              <button onClick={() => openModal('booking')} className="miel-btn-secondary w-full sm:w-auto text-center">Book a Table</button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex items-center gap-10 opacity-60"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-miel-coffee">12k+</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Subscribers</span>
            </div>
            <div className="w-[1px] h-8 bg-stone-300"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif text-miel-coffee">4.9/5</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">User Rating</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const { addToCart } = useAppContext();
  const featured = MENU_ITEMS.filter(i => i.featured);

  return (
    <section className="section-spacing bg-white">
      <div className="container-wide">
        <SectionTitle title="Our Best Sellers" subtitle="Handpicked for you" />
        <div className="grid md:grid-cols-3 gap-10">
          {featured.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="miel-card group p-4"
            >
              <div className="h-80 overflow-hidden rounded-xl mb-6 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-miel-coffee shadow-sm">
                  {item.price}
                </div>
              </div>
              <div className="px-2 pb-4">
                <h3 className="text-2xl mb-2 text-miel-coffee">{item.name}</h3>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed">{item.description}</p>
                <button 
                  onClick={() => addToCart(item.name)}
                  className="w-full flex items-center justify-center gap-3 bg-miel-beige/30 hover:bg-miel-coffee hover:text-white transition-all py-3 rounded-xl font-bold text-stone-700"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutBrand = () => {
  return (
    <section id="about" className="section-spacing bg-miel-cream">
      <div className="container-wide grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800" 
              className="rounded-2xl shadow-xl aspect-[1/1.2] object-cover mt-12"
              alt="Floral arrangements"
            />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
              className="rounded-2xl shadow-xl aspect-[1/1.2] object-cover"
              alt="Cafe interior"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-miel-pink/20 rounded-full blur-3xl -z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center z-20 shadow-2xl">
            <Flower2 className="text-miel-gold w-12 h-12" />
          </div>
        </div>

        <div>
          <SectionTitle title="A Sanctuary for the Senses" subtitle="The Miel Concept" centered={false} />
          <p className="text-stone-500 text-lg leading-relaxed mb-8">
            Miel Coffee was born from a simple desire: to blend the comforting warmth of artisan coffee with the revitalizing beauty of fresh botanicals. 
          </p>
          <div className="space-y-6 mb-10">
            {[
              { title: "Specialty Roasted", desc: "Small-batch beans sourced from ethical cooperatives.", icon: <Coffee className="w-5 h-5" /> },
              { title: "Boutique Florals", desc: "Hand-tied bouquets inspired by the season.", icon: <Flower2 className="w-5 h-5" /> },
              { title: "Curated Space", desc: "Designed for comfort, productivity, and calm.", icon: <MapPin className="w-5 h-5" /> }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-miel-gold shadow-sm flex-shrink-0 border border-black/5">{feature.icon}</div>
                <div>
                  <h4 className="text-miel-coffee font-serif text-xl">{feature.title}</h4>
                  <p className="text-stone-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="miel-btn-primary">Learn Our Story</button>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useAppContext();
  const categories = ['All', 'Coffee', 'Iced Drinks', 'Pastries'];

  const filtered = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === activeCategory);

  return (
    <section id="menu" className="section-spacing bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-lg">
            <SectionTitle title="Signature Menu" subtitle="Our Daily Craft" centered={false} />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-miel-coffee text-white shadow-lg' : 'bg-miel-cream text-stone-500 hover:bg-stone-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div 
                key={item.id} 
                layout 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="miel-card p-4 group"
              >
                <div className="h-64 rounded-xl overflow-hidden mb-5 relative group-hover:shadow-lg transition-all">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif text-miel-coffee">{item.name}</h3>
                  <span className="font-bold text-miel-gold">{item.price}</span>
                </div>
                <p className="text-stone-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                <button 
                  onClick={() => addToCart(item.name)} 
                  className="w-full flex items-center justify-center gap-2 border border-stone-100 py-3 rounded-xl font-bold text-stone-600 hover:bg-miel-coffee hover:text-white hover:border-miel-coffee transition-all"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Order
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="section-spacing bg-miel-cream">
      <div className="container-wide">
        <SectionTitle title="Guest Experiences" subtitle="The Miel Community" />
        <div className="grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl premium-shadow"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => <StarIcon key={idx} className="w-4 h-4 fill-miel-gold text-miel-gold" />)}
              </div>
              <p className="text-stone-600 text-lg italic mb-10 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 border-t border-stone-50 pt-8">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-miel-cream" />
                <div>
                  <h4 className="font-serif text-lg text-miel-coffee">{t.name}</h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialFeed = () => {
  return (
    <section className="section-spacing bg-white overflow-hidden">
      <div className="container-wide mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <SectionTitle title="Social Collective" subtitle="Follow Our Story" centered={false} />
        <a href="#" className="flex items-center gap-2 text-miel-coffee font-bold hover:text-miel-gold transition-colors">
          <Instagram className="w-5 h-5" /> @mielcoffee_official
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {SOCIAL_FEED.map((img, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className="aspect-square relative overflow-hidden group cursor-pointer"
          >
            <img src={img} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" alt="Instagram post" />
            <div className="absolute inset-0 bg-miel-coffee/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BookingSection = () => {
  const { openModal } = useAppContext();
  return (
    <section className="section-spacing bg-miel-coffee text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-miel-gold/10 -skew-x-12 translate-x-1/2"></div>
      <div className="container-wide relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <span className="text-miel-pink uppercase tracking-widest font-bold text-sm mb-4 block">Reservations</span>
          <h2 className="text-5xl md:text-6xl mb-8 leading-tight">Elevate Your Afternoon <br /> with <span className="italic">Miel</span></h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl">
            From intimate gatherings to focused work sessions, book your table in advance and let us prepare for your arrival. 
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <button onClick={() => openModal('booking')} className="bg-white text-miel-coffee px-10 py-5 rounded-full font-bold text-lg hover:bg-miel-beige transition-all shadow-xl">
              Book a Table
            </button>
            <div className="flex items-center gap-4 text-white/60">
              <Phone className="w-5 h-5 text-miel-pink" />
              <span className="font-bold">+1 (234) 567 8900</span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-serif mb-6 flex items-center gap-3"><Clock className="text-miel-pink" /> Peak Hours</h3>
            <div className="space-y-4 text-stone-300">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span>Breakfast Session</span>
                <span className="text-white font-bold">07:00 – 10:30</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5 text-miel-pink">
                <span>Botanical Tea Time</span>
                <span className="font-bold underline">15:00 – 17:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Evening Calm</span>
                <span className="text-white font-bold">18:00 – 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterSignup = () => {
  return (
    <section className="py-20 bg-miel-beige/20">
      <div className="container-wide text-center">
        <h3 className="text-3xl font-serif text-miel-coffee mb-4">Stay in the Miel Collective</h3>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">Get monthly seasonal updates, special offers, and early event access.</p>
        <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="flex-1 px-8 py-4 bg-white rounded-full border border-black/5 focus:ring-2 focus:ring-miel-coffee outline-none transition-all shadow-sm"
          />
          <button className="miel-btn-primary flex items-center justify-center gap-2 group">
            Subscribe <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer bg-stone-900 text-white pt-24 pb-12">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-stone-900 font-serif font-bold">M</div>
              <span className="text-2xl font-serif font-bold tracking-tighter">Miel Coffee</span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed">
              Crafting premium coffee experiences infused with local honey and artisanal blooms since 2024.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-miel-gold transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg uppercase tracking-widest font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Home Experience</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Concept</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Artisan Menu</a></li>
              <li><a href="#flowers" className="hover:text-white transition-colors">Boutique Florals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg uppercase tracking-widest font-bold mb-8">Visit Us</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-miel-gold w-4 h-4 mt-1" />
                <span>123 Botanical Ave, <br />Garden District, FC 45012</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-miel-gold w-4 h-4" />
                <span>Open Daily: 07:00 – 20:00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-miel-gold w-4 h-4" />
                <span>hello@mielcoffee.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg uppercase tracking-widest font-bold mb-8">Careers</h4>
            <p className="text-stone-400 text-sm mb-6">Want to join the artisan collective?</p>
            <button className="text-miel-gold font-bold border-b border-miel-gold/30 pb-1 hover:text-white transition-colors">
              Send Your CV
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 text-center text-stone-500 text-xs tracking-widest uppercase">
          © 2024 MIEL COFFEE COLLECTIVE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'booking' | 'contact' | null>(null);

  const addToCart = (itemName: string) => {
    setCartCount(prev => prev + 1);
    setToastMessage(`${itemName} added to your order!`);
  };

  const openModal = (type: 'booking' | 'contact') => {
    setModalType(type);
  };

  return (
    <AppContext.Provider value={{ cartCount, addToCart, openModal }}>
      <div className="antialiased">
        <Navbar />
        <Hero />
        <FeaturedProducts />
        <AboutBrand />
        <MenuSection />
        <TestimonialsSection />
        <SocialFeed />
        <BookingSection />
        <NewsletterSignup />
        <Footer />

        <AnimatePresence>
          {toastMessage && (
            <Toast 
              message={toastMessage} 
              onClose={() => setToastMessage(null)} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {modalType && (
            <Modal 
              type={modalType} 
              onClose={() => setModalType(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}
