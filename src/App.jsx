import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { 
  Gamepad2, 
  Monitor, 
  Cpu, 
  Coffee, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Users,
  MessageSquare,
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Menu, 
  X,
  Play,
  ArrowDown
} from 'lucide-react';

// --- DATA ---
const SERVICES = [
  {
    id: 1,
    title: "Elite PC Gaming",
    desc: "RTX 40-Series powered rigs with 240Hz monitors for the ultimate competitive edge.",
    icon: <Monitor className="w-8 h-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957",
    tags: ["RTX 4090", "240Hz", "eSports Ready"]
  },
  {
    id: 2,
    title: "Next-Gen Consoles",
    desc: "Experience PlayStation 5 on massive 4K OLED displays with premium haptic feedback.",
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    image: "https://lh3.googleusercontent.com/p/AF1QipMyWpWurobGoxCK9MBJtORd9BDGI43JbnVYLrwt=s1600",
    tags: ["PS5", "4K OLED", "DualSense"],
    featured: true
  },
  {
    id: 3,
    title: "Cafe & Lounge",
    desc: "Refuel with gourmet snacks and energy drinks in our specialized gaming lounge.",
    icon: <Coffee className="w-8 h-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047",
    tags: ["Snacks", "Energy Drinks", "VIP Lounge"]
  }
];

const PRICING = [
  {
    name: "Casual Gamer",
    price: "100",
    period: "per hour",
    features: ["Any PC or Console", "Standard Peripherals", "Free Wi-Fi", "Access to Lounge"],
    cta: "Start Gaming",
    popular: false
  },
  {
    name: "Pro Session",
    price: "400",
    period: "for 5 hours",
    features: ["Priority Slot Booking", "Pro Peripherals", "1 Complimentary Drink", "Access to Pro Zone"],
    cta: "Go Pro",
    popular: true
  },
  {
    name: "All-Day Pass",
    price: "800",
    period: "full day",
    features: ["Unlimited Gaming", "VIP Seating", "2 Snacks + 2 Drinks", "Exclusive VR Access"],
    cta: "Legendary Mode",
    popular: false
  }
];

const TESTIMONIALS = [
  {
    name: "Aman Shah",
    role: "Professional Valorant Player",
    content: "The latency here is non-existent. Best rigs in Ahmedabad for competitive gaming. The atmosphere is just electric!",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Casual Gamer",
    content: "Loved the PS5 setup! The 4K OLED TVs make such a difference. Great snacks too, highly recommend for a weekend hangout.",
    rating: 5
  },
  {
    name: "Rahul Mehra",
    role: "Regular Member",
    content: "RD Game Zone is my second home. The staff is friendly, the hardware is top-notch, and the VIP lounge is super comfy.",
    rating: 5
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/70 py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="p-2 bg-primary rounded-lg">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">RD <span className="text-primary">ZONE</span></span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20 min-h-[44px]"
          >
            BOOK NOW
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-gray-300 hover:text-primary py-2 min-h-[44px] flex items-center"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-primary text-white py-4 rounded-xl font-black mt-2 min-h-[48px]">BOOK A SLOT</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-dark-base z-10" />
        <img 
          src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFfUr9-cx-VilvMkuM2wCZhUWK08d3MnKxdzg4N3b78kQPhIb79K1OjfnG_Pwh1bAaAkR5AkzJeryA7tEUiJIZtx6bHfVLSw5bZhZO9ZI5S1ELTLCt0qcpu-TLaFbYIcA45TkS1=s1600" 
          alt="Gaming Arena"
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          width="1920"
          height="1080"
          fetchpriority="high"
        />
        <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none z-20" />
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 text-primary rounded-full text-xs font-black tracking-widest mb-6">
            AHMEDABAD'S PREMIER GAMING HUB
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9] font-serif">
            Unleash the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-300% animate-gradient italic">RD Power</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-10 font-medium">
            Step into the next generation of competitive gaming. High-end hardware, 
            zero lag, and a community of legends await you in Shahibag.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-full font-black text-lg flex items-center justify-center gap-2 shadow-2xl shadow-primary/40 min-h-[56px] transition-all"
            >
              START GAMING <ChevronRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border border-white/10 text-white px-12 py-5 rounded-full font-black text-lg min-h-[56px] backdrop-blur-sm"
            >
              EXPLORE
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};


const Stats = () => {
  const stats = [
    { label: "High-End PCs", value: "30+", icon: <Cpu className="w-5 h-5" /> },
    { label: "Member Community", value: "500+", icon: <Star className="w-5 h-5" /> },
    { label: "Gaming Hours", value: "10k+", icon: <Clock className="w-5 h-5" /> },
    { label: "Expert Support", value: "24/7", icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-dark-surface border-y border-white/5 py-12 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-primary font-black text-4xl mb-2">{stat.value}</div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                {stat.icon} {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-dark-base overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-3xl z-0" />
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070" 
                alt="Gaming Experience"
                className="w-full aspect-square md:aspect-video object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Play className="text-white fill-current ml-1" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Watch Tour</div>
                    <div className="text-gray-400 text-sm">Experience the vibe</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-primary font-black tracking-widest text-sm uppercase">The Story</span>
            <h2 className="text-4xl md:text-7xl font-black text-white mt-4 mb-8 tracking-tighter leading-tight font-serif italic">
              More than just a <br />
              <span className="text-primary">Game Zone.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Founded by gamers for gamers, RD Game Zone was born out of a desire to create 
              the ultimate gaming destination in Ahmedabad. We combine cutting-edge technology 
              with a high-octane social environment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">Pro-Level Gear</h4>
                  <p className="text-gray-500 text-sm">Standard across every PC rig.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold">Vibrant Community</h4>
                  <p className="text-gray-500 text-sm">Tournaments and community events.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-dark-surface relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black tracking-widest text-sm uppercase"
          >
            Level Up
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white mt-4 tracking-tighter font-serif italic"
          >
            Our Programs
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-dark-elevated rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">
                    Most Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-elevated via-transparent to-transparent" />
              </div>
              <div className="p-8">
                <div className="mb-6 bg-dark-surface w-16 h-16 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-dark-base">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black tracking-widest text-sm uppercase"
          >
            No Lag, Just Game
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white mt-4 tracking-tighter font-serif italic"
          >
            Select your Battle Pass
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-10 rounded-2xl border ${plan.popular ? 'bg-primary border-primary scale-105 z-10 shadow-2xl shadow-primary/20' : 'bg-dark-surface border-white/5'} flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                  Recommended for Pros
                </div>
              )}
              <h3 className={`text-xl font-black uppercase tracking-widest mb-2 ${plan.popular ? 'text-white' : 'text-gray-400'}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-black ${plan.popular ? 'text-white' : 'text-white'}`}>₹{plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'} font-bold`}>{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-semibold">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-300'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05, letterSpacing: '0.05em' }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-5 rounded-full font-black uppercase tracking-widest transition-all ${plan.popular ? 'bg-white text-primary' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-dark-surface overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-0 rounded-full" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Community Feedback</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-elevated p-8 rounded-2xl border border-white/5 relative"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}
              </div>
              <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-black text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-primary text-xs font-black uppercase tracking-widest">{t.role}</div>
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
    <section id="contact" className="py-16 md:py-24 bg-dark-base relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 uppercase leading-tight font-serif italic">
              Reserve your <br />
              <span className="text-primary">Battlestation</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Ready to dominate? Contact us to book your rigs, consoles, or the 
              entire lounge for events.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/5 text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-gray-500 leading-relaxed max-w-xs">
                    First floor, A-113, opp. Swami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/5 text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Direct Line</h4>
                  <a href="tel:+917665533991" className="text-gray-500 hover:text-primary transition-colors">+91 76655 33991</a>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/5 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email Us</h4>
                  <a href="mailto:play@rdgamezone.com" className="text-gray-500 hover:text-primary transition-colors">play@rdgamezone.com</a>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/5 text-gray-400 hover:text-primary hover:border-primary transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/5 text-gray-400 hover:text-primary hover:border-primary transition-all">
                <Users size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/5 text-gray-400 hover:text-primary hover:border-primary transition-all">
                <MessageSquare size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="bg-dark-surface p-8 md:p-12 rounded-2xl border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-dark-base border border-white/10 rounded-xl px-5 py-4 text-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-700" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full bg-dark-base border border-white/10 rounded-xl px-5 py-4 text-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-700" />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Service Type</label>
                <select className="w-full bg-dark-base border border-white/10 rounded-xl px-5 py-4 text-white focus:border-primary focus:outline-none transition-all appearance-none">
                  <option>PC Gaming Slot</option>
                  <option>Console Zone Slot</option>
                  <option>VR Experience</option>
                  <option>VIP Lounge Booking</option>
                </select>
              </div>
              <div className="mb-8">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Special Requests</label>
                <textarea rows="4" placeholder="Any specific requirements?" className="w-full bg-dark-base border border-white/10 rounded-xl px-5 py-4 text-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-700"></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, letterSpacing: '0.1em' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white py-6 rounded-full font-black text-lg tracking-widest shadow-xl shadow-primary/30"
              >
                REQUEST BOOKING
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="container mx-auto px-4 mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="h-[400px] rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 shadow-2xl"
        >
          <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1787.9024724844376!2d72.5868776983948!3d23.0452531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e855444d83805%3A0xbfd1c16eff4770f3!2sRD%20GAME%20ZONE!5e1!3m2!1sen!2sin!4v1778063596340!5m2!1sen!2sin" 
          width="100%" 
          height="400px"
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark-surface pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-primary rounded-lg">
                <Gamepad2 className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">RD <span className="text-primary">ZONE</span></span>
            </div>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed">
              Elevating the gaming scene in Ahmedabad with premium hardware, 
              next-gen experiences, and a vibrant community. Join the elite.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Quick Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Pricing', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-primary transition-colors font-bold uppercase text-xs tracking-widest">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Gaming Hours</h4>
            <ul className="space-y-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
              <li>Mon - Fri: 10:00 - 23:00</li>
              <li>Sat - Sun: 10:00 - 01:00</li>
              <li className="text-primary">Always Open for Legends</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
