import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Coffee, Star, Mail, Instagram, Facebook, Linkedin, Youtube, Phone, MapPin } from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";


export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate frame index (0-30 for 37 frames)
  const frameIndex = useTransform(smoothProgress, [0, 0.5], [1, 37]);
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      setCurrentFrame(Math.floor(latest));
    });
  }, [frameIndex]);

  // Preload images
  useEffect(() => {
    for (let i = 1; i <= 37; i++) {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}assets/coffee-frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const marqueeItems = [
    "AROMATIC BLISS AWAITS",
    "EXPERIENCE COFFEE MAGIC",
    "WHERE COMMUNITY CONNECTS",
    "TASTE THE DIFFERENCE",
    "CRAFTED WITH PASSION",
  ];

  const marqueeItems2 = [
    "VIBRANT COFFEE CULTURE",
    "HAVING JOY DAILY",
    "YOUR COFFEE ESCAPE",
    "PREMIUM BEANS ONLY",
    "ROASTED TO PERFECTION",
  ];

  const currentFramePath = useMemo(() => {
    const frameNum = Math.min(Math.max(currentFrame, 1), 37);
    return `${import.meta.env.BASE_URL}assets/coffee-frames/ezgif-frame-${frameNum.toString().padStart(3, '0')}.jpg`;
  }, [currentFrame]);
  return (
    <div ref={containerRef} className="min-h-[200vh] bg-coffee-black text-white font-sans selection:bg-orange-500 selection:text-black">
      {/* Scroll Background */}
      <div className="fixed inset-0 z-0 bg-coffee-black overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src={currentFramePath}
          alt="Coffee Background"
          className="w-full h-full object-cover opacity-70 grayscale-[5%] brightness-[0.95] scale-105"
        />

      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Coffee className="text-black w-5 h-5" />
          </div>
          <span className="font-display text-xl tracking-wider uppercase font-bold text-orange-500">Roast & Co</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">Home</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Products</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Promo & Discount</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Stores</a>
        </div>

        <button className="px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Register Now
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 pt-48 pb-32 px-6 md:px-12 flex flex-col items-center justify-center min-h-screen overflow-hidden">

        {/* Main Heading */}
        <div className="relative z-10 text-center max-w-6xl">
          <motion.h1
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl md:text-[12rem] leading-[0.85] uppercase tracking-tighter"
          >
            Fuel Your Day <br />
            <span className="text-orange-500">With Some</span> Coffee
          </motion.h1>
        </div>

        {/* Description & CTA */}
        <div className="relative z-10 mt-16 text-center max-w-2xl">
          <motion.p
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 drop-shadow-md"
          >
            Coffee, a beloved beverage enjoyed worldwide, brings warmth and energy with its rich aroma and invigorating flavor. Discover our hand-picked beans from the world's finest estates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl"
            >
              Shop Now
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="text-white w-4 h-4" />
              </div>
            </motion.button>
          </motion.div>
        </div>

      </main>

      {/* Marquee Section */}
      <div className="relative z-20">
        <div className="bg-zinc-800/80 backdrop-blur-md border-y border-white/10 py-4 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <span className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-white">{item}</span>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-orange-500 py-4 overflow-hidden shadow-2xl">
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {[...marqueeItems2, ...marqueeItems2].map((item, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <span className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-black">{item}</span>
                <Star className="w-6 h-6 md:w-8 md:h-8 text-black fill-current" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brune Coffee Bar Section */}
      <section className="relative z-30 bg-white text-black py-24 px-6 md:px-12 border-[12px] md:border-[24px] border-orange-600 m-6 md:m-12 rounded-[2rem] md:rounded-[4rem] flex flex-col items-center">
        <div className="max-w-7xl w-full">
          <header className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-8xl mb-4">Roast & Co</h2>
            <p className="text-lg md:text-xl font-medium tracking-tight opacity-80 uppercase">The place where bold coffee meets good vibes.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 items-center">
            {/* Gallery Image 1 */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="aspect-[4/5] bg-zinc-100 rounded-[2.5rem] overflow-hidden -rotate-6 shadow-2xl border-4 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
                alt="Coffee Bar Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gallery Image 2 */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="aspect-[4/5] bg-zinc-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
                alt="Barista working"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gallery Image 3 */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 8 }}
              className="aspect-[4/5] bg-zinc-100 rounded-[2.5rem] overflow-hidden rotate-6 shadow-2xl border-4 border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                alt="Coffee Shop Exterior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </section>


      {/* CTA Section (Teal) */}
      <section className="bg-[#1a5f5f] text-white py-32 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-6xl md:text-[10rem] leading-[0.8] uppercase tracking-tighter mb-12">
              Order Your Coffee <br />
              <span className="text-[#96c2c2]">Feel The Difference</span>
            </h2>
            <button className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl">
              Order Now
            </button>
          </motion.div>
        </div>

        {/* Floating elements for CTA */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 bg-orange-200/20 w-32 h-32 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 bg-white/10 w-64 h-64 rounded-full blur-3xl"
          />
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="relative z-30 bg-coffee-beige text-coffee-dark py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl mb-4 uppercase">Loved by Coffee Lovers</h2>
          <p className="text-zinc-600 mb-16 max-w-lg mx-auto font-medium">Crafted with care. Rated highly by real coffee drinkers.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: "Sara Zones", image: `${import.meta.env.BASE_URL}assets/testimonials/sara.jpg`, text: "\"The smoothest cold brew I've had — rich, bold flavor without any bitterness. Perfect for everyday sipping.\"" },
              { name: "Michael Lee", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", text: "\"Clean, refreshing, and incredibly balanced. You can really taste the quality of the beans in every sip.\"" },
              { name: "Emily Carter", image: `${import.meta.env.BASE_URL}assets/testimonials/emily.jpg`, text: "\"Absolutely love it. Smooth, strong, and not acidic at all. This has become my go-to cold brew.\"" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-coffee-light p-10 rounded-[2rem] relative flex flex-col items-center">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-coffee-beige overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-12 mb-6">
                  <h4 className="font-bold text-lg mb-4">{testimonial.name}</h4>
                  <p className="text-zinc-600 italic mb-6">{testimonial.text}</p>
                  <div className="flex gap-1 justify-center mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />)}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold opacity-60">Verified Customer</span>
                </div>
              </div>
            ))}
          </div>

          <button className="border border-zinc-400 px-8 py-3 rounded-lg font-bold text-sm hover:bg-zinc-100 transition-colors uppercase tracking-widest">
            Read More Reviews
          </button>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="relative z-30 bg-coffee-beige text-coffee-dark py-32 px-6 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-8xl mb-6 uppercase">Subscribe & Chill</h2>
          <p className="text-zinc-600 mb-12 max-w-lg mx-auto font-medium">Get closer to our brew — perks, flavors, and offers made just for you.</p>

          <form className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 bg-white/50 border border-zinc-300 rounded-xl px-6 py-4 outline-none focus:border-coffee-accent transition-colors"
            />
            <button className="bg-[#6b3e2e] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#5a3326] transition-colors whitespace-nowrap">
              Join The Brew Club
            </button>
          </form>
          <p className="text-sm font-medium">Already loved by <span className="font-bold">5,000+</span> coffee lovers</p>
        </div>
      </section>

      {/* Features Info Section */}
      <section className="relative z-30 bg-coffee-beige text-coffee-dark py-24 px-6 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { icon: "✧", title: "Exclusive Flavors", desc: "Members-only cold brew drops you won't find anywhere else." },
            { icon: "⚡", title: "Early Access", desc: "Be first to try new blends before anyone else." },
            { icon: "🏷", title: "Special Discounts", desc: "Subscriber-only deals crafted to save you more." },
            { icon: "🎁", title: "Member Rewards", desc: "Surprises, seasonal perks, and special treats just for our brew club." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl mb-4 opacity-60">{feature.icon}</span>
              <h4 className="font-bold text-xl mb-3">{feature.title}</h4>
              <p className="text-zinc-600 text-sm leading-relaxed max-w-[200px] mx-auto">{feature.desc}</p>
              <a href="https://roastnco.com" className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">roastnco.com</a>
            </div>
          ))}
        </div>
      </section>

      {/* Final Redesigned Footer */}
      <footer className="relative z-30 bg-coffee-dark text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest opacity-80">
              <a href="#" className="hover:opacity-100 transition-opacity">Home</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Menu</a>
              <a href="#" className="hover:opacity-100 transition-opacity">About Us</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>

            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">Roast & Co</h2>

            <div className="flex gap-6">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-white opacity-80 hover:opacity-100 transform hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center pt-12 border-t border-white/5 opacity-40 text-[10px] font-bold uppercase tracking-[0.4em]">
            <p>© 2026 Roast & Co. All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
