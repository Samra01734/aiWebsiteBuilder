import React from "react";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function LoginModel({ open, onClose }) {
  const dispatch = useDispatch();

  if (!open) return null;

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Firebase User:", user);

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        },
        { withCredentials: true }
      );

      console.log("Backend Response:", data);

      // ✅ FIX: store ONLY user object
      dispatch(setUserData(data.user));

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
      <motion.div
        className="relative w-full max-w-lg rounded-3xl p-10 shadow-2xl border border-white/10 bg-gradient-to-br from-purple-900 via-zinc-950 to-black"
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-zinc-400 mb-8">
          Sign in to <span className="text-purple-400">GenWeb AI</span>
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-semibold"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="google"
          />
          Continue with Google
        </motion.button>

        <p className="text-xs text-center text-zinc-500 mt-6">
          By continuing, you agree to Terms & Privacy Policy
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LoginModel;