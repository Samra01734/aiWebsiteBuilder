import React from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { serverUrl } from "../App";

function LoginModel({ open, onClose }) {
  if (!open) return null;

  const handleGoogleAuth = async () => {
    try {
      // 1. Firebase Google Login
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Firebase User:", user);

      // 2. Send to backend
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Backend Response:", data);

      // 3. Close modal after success
      onClose();

    } catch (error) {
      console.log("Google Auth Error:", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* MODAL */}
      <motion.div
        className="relative w-full max-w-lg rounded-3xl p-10 shadow-2xl border border-white/10
        bg-gradient-to-br from-purple-900 via-zinc-950 to-black"
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* FLOATING GLOW */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500 blur-3xl opacity-30 rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-zinc-400 mb-8">
          Sign in to <span className="text-purple-400 font-semibold">GenWeb AI</span>
        </p>

        {/* GOOGLE BUTTON */}
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/40 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="google"
          />
          Continue with Google
        </motion.button>

        {/* FOOTER */}
        <p className="text-xs text-center text-zinc-500 mt-6">
          By continuing, you agree to Terms & Privacy Policy
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LoginModel;