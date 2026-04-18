import React from 'react';
import { motion } from 'motion/react';

const Home = () => {
  const currentYear = new Date().getFullYear();

  const highlights = [
    {
      title: "Lightning Fast",
      desc: "Generate production-ready websites in under 30 seconds",
      icon: "⚡",
    },
    {
      title: "AI Powered",
      desc: "Intelligent system that understands design & user intent",
      icon: "🧠",
    },
    {
      title: "Fully Responsive",
      desc: "Perfectly optimized for all devices out of the box",
      icon: "📱",
    },
    {
      title: "No Code Needed",
      desc: "Describe your vision — AI builds it instantly",
      icon: "✨",
    },
  ];

  // Advanced Colored Particles
  const ColoredParticles = () => (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {Array.from({ length: 70 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: Math.random() * 5 + 2 + 'px',
            height: Math.random() * 5 + 2 + 'px',
            boxShadow: '0 0 18px rgba(129, 140, 248, 0.8)',
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.9,
            opacity: Math.random() * 0.6 + 0.3,
            scale: Math.random() * 0.7 + 0.5,
          }}
          animate={{
            y: [null, -window.innerHeight * 1.3],
            x: [null, (Math.random() - 0.5) * 320],
            opacity: [null, 0.08],
            scale: [null, Math.random() * 0.5 + 0.3],
          }}
          transition={{
            duration: Math.random() * 40 + 38,
            repeat: Infinity,
            delay: Math.random() * -50,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* Background - Pure Black with Box Grid */}
      <div className="fixed inset-0 z-[-2]">
        {/* Visible Box Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] 
                     bg-[size:80px_80px]"
        />
        
        {/* Extra subtle overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_2px)] bg-[size:40px_40px]" />
      </div>

      {/* Colored Floating Particles */}
      <ColoredParticles />

      {/* Premium Navbar */}
      <motion.nav 
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-black/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-[-2px]">
            GenWeb<span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">.ai</span>
          </div>

          <div className="flex items-center gap-10">
            <div className="hidden md:block text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors">
              Pricing
            </div>
            <button className="px-7 py-3 rounded-2xl border border-white/20 hover:border-white/40 text-sm font-medium transition-all hover:bg-white/5">
              Get <span className="text-blue-400">Started</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-52 pb-32 px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-7xl md:text-8xl lg:text-[92px] font-bold leading-none tracking-[-3px] mb-8"
          >
            Build Stunning Websites<br />
            With <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">AI</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="max-w-3xl mx-auto text-2xl text-zinc-400 mb-14 font-light"
          >
            Describe your idea once. Get a production-ready, beautiful website in seconds.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="px-14 py-6 text-xl font-semibold rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600 
                       hover:brightness-110 shadow-2xl shadow-purple-500/50 transition-all"
          >
            Start Building Free
          </motion.button>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="px-6 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-20 tracking-tight"
          >
            Why Choose GenWeb.ai
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -14 }}
                className="group bg-zinc-950 border border-white/10 hover:border-blue-500/40 
                           rounded-3xl p-10 transition-all duration-500"
              >
                <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-3xl font-bold tracking-[-1px]">
              GenWeb<span className="text-violet-400">.ai</span>
            </div>

            <div className="text-zinc-500 text-sm">
              © {currentYear} GenWeb.ai. All Rights Reserved.
            </div>

            <div className="flex gap-8 text-sm text-zinc-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;