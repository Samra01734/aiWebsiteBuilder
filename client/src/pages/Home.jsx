import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModel from '../components/LoginModel';

const Home = () => {
  const currentYear = new Date().getFullYear();

  const [openLogin, setOpenLogin] = useState(false);

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

  const ColoredParticles = () => (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
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
            y: Math.random() * window.innerHeight,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_2px)] bg-[size:40px_40px]" />
      </div>

      <ColoredParticles />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* LOGO */}
          <div className="text-3xl font-bold tracking-tight">
            GenWeb<span className="text-blue-400">.ai</span>
          </div>

          {/* NAV LINKS */}
          <div className="flex items-center gap-8">

            <button className="text-sm text-zinc-400 hover:text-white transition">
              Pricing
            </button>

            <button
              onClick={() => setOpenLogin(true)}
              className="px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Get Started
            </button>

          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="pt-48 text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-bold"
        >
          Build Stunning Websites with <span className="text-blue-400">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-zinc-400"
        >
          Describe your idea — AI builds it instantly.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setOpenLogin(true)}
          className="mt-10 px-10 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl font-semibold"
        >
          Start Free
        </motion.button>

      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 mt-24">

        {highlights.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-zinc-900 border border-white/10 rounded-2xl"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="text-xl mt-3 font-semibold">{item.title}</h3>
            <p className="text-zinc-400 text-sm mt-2">{item.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* FOOTER */}
      <footer className="text-center py-12 text-zinc-500 mt-20">
        © {currentYear} GenWeb.ai. All Rights Reserved.
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {openLogin && (
          <LoginModel
            open={openLogin}
            onClose={() => setOpenLogin(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;