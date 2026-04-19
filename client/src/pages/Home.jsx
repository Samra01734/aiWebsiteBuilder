import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModel from '../components/LoginModel';
import { useDispatch, useSelector } from 'react-redux';
import { Coins } from 'lucide-react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInitials = (name = "") =>
    name.split(" ").map(n => n[0]).join("").toUpperCase();

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      });

      dispatch(setUserData(null));
      setOpenProfile(false);

      toast.success("Logged out successfully 👋");

    } catch (error) {
      console.log(error);
      toast.error("Logout failed ❌");
    }
  };

  const highlights = [
    { title: "Lightning Fast", desc: "Generate production-ready websites in under 30 seconds", icon: "⚡" },
    { title: "AI Powered", desc: "Intelligent system that understands design & user intent", icon: "🧠" },
    { title: "Fully Responsive", desc: "Perfectly optimized for all devices out of the box", icon: "📱" },
    { title: "No Code Needed", desc: "Describe your vision — AI builds it instantly", icon: "✨" },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND (UNCHANGED) */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70f_1px,transparent_1px),linear-gradient(to_bottom,#a855f70f_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#a855f715_1px,transparent_2px)] bg-[size:40px_40px]" />
      </div>

      {/* NAVBAR (UNCHANGED EXACTLY) */}
      <motion.nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div className="text-3xl font-bold">
            GenWeb<span className="text-purple-400">.ai</span>
          </div>

          <div className="flex items-center gap-4">

            {userData && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm bg-purple-500/10 border border-purple-500/40 text-purple-200">
                <Coins size={16} />
                <span>{userData.credits}</span>
              </div>
            )}

            <button className="px-4 py-2 rounded-xl border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 transition">
              Pricing
            </button>

            {!userData ? (
              <button
                onClick={() => setOpenLogin(true)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition"
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={() => setOpenProfile(true)}
                className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/40 bg-purple-600 font-bold"
              >
                {userData?.photoURL ? (
                  <img src={userData.photoURL} className="w-full h-full object-cover" />
                ) : (
                  getInitials(userData?.name)
                )}
              </button>
            )}

          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="pt-48 text-center px-6">
        <h1 className="text-6xl font-bold">
          Build Websites with <span className="text-purple-400">AI</span>
        </h1>

        <p className="mt-6 text-zinc-400">
          Describe your idea — AI builds it instantly.
        </p>

        {/* ✅ ONLY THIS BUTTON FIXED */}
        <button
          onClick={() => {
            if (userData) {
              navigate("/dashboard");
            } else {
              setOpenLogin(true);
            }
          }}
          className="mt-10 px-10 py-4 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition"
        >
          {userData ? "Go to Dashboard" : "Start Free"}
        </button>
      </section>

      {/* FEATURES (UNCHANGED) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10 mt-24">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-black/40 border border-purple-500/20 hover:border-purple-400/60 transition"
          >
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl mt-2 font-semibold">{item.title}</h3>
            <p className="text-zinc-400 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="text-center py-12 text-zinc-500 mt-20">
        © {currentYear} GenWeb.ai
      </footer>

      {/* LOGIN */}
      <AnimatePresence>
        {openLogin && (
          <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
        )}
      </AnimatePresence>

      {/* PROFILE POPUP (UNCHANGED) */}
      <AnimatePresence>
        {openProfile && userData && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenProfile(false)}
          >
            <motion.div
              className="w-[340px] rounded-2xl p-6 text-center relative bg-black/60 border border-purple-500/30"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={() => setOpenProfile(false)}
                className="absolute right-4 top-3 text-zinc-400 hover:text-red-400 text-xl"
              >
                ×
              </button>

              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-purple-600 flex items-center justify-center font-bold border border-purple-400/40">
                {userData?.photoURL ? (
                  <img src={userData.photoURL} className="w-full h-full object-cover" />
                ) : (
                  getInitials(userData?.name)
                )}
              </div>

              <h2 className="mt-4 text-lg font-semibold">{userData?.name}</h2>
              <p className="text-sm text-zinc-400">{userData?.email}</p>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-purple-200">
                <Coins size={16} />
                <span>{userData?.credits} Credits</span>
              </div>

              <div className="mt-6 space-y-3">

                <button
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>

                <button
                  className="w-full py-2 rounded-xl border border-purple-500/40 hover:bg-purple-500/10 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;