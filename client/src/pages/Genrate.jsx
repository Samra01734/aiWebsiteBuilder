import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

const Generate = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#a855f730,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70f_1px,transparent_1px),linear-gradient(to_bottom,#a855f70f_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* TOP BAR (BACK BUTTON) */}
      <div className="fixed top-0 left-0 w-full px-6 py-4 flex items-center gap-3 z-50 bg-black/40 backdrop-blur-xl border-b border-purple-500/20">

        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-xl border border-purple-500/30 hover:bg-purple-500/10 transition group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition"
          />
        </button>

        <h1 className="text-lg font-semibold text-purple-300">
          Generate Website
        </h1>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl px-6 mt-20"
      >

        {/* HEADING */}
        <h1 className="text-5xl font-bold text-center">
          Build <span className="text-purple-400">Anything</span> with AI
        </h1>

        <p className="text-center text-zinc-400 mt-3">
          Describe your idea and AI will turn it into a website instantly
        </p>

        {/* INPUT LABEL */}
        <p className="mt-10 mb-2 text-sm text-purple-300">
          Describe your website
        </p>

        {/* INPUT BOX */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A modern portfolio website for a developer with dark theme and animations..."
          className="w-full h-40 p-4 rounded-2xl bg-black/40 border border-purple-500/30 focus:border-purple-400 outline-none resize-none text-white placeholder:text-zinc-500 backdrop-blur-xl"
        />

        {/* BUTTON */}
        <button
          disabled={!prompt.trim()}
          onClick={() => {
            console.log("Generate:", prompt);
            navigate("/dashboard"); // later backend route
          }}
          className={`mt-6 w-full py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2
            ${
              prompt.trim()
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] cursor-pointer"
                : "bg-purple-900/30 text-zinc-500 cursor-not-allowed"
            }`}
        >
          <Sparkles size={18} />
          Generate Website
        </button>

      </motion.div>
    </div>
  );
};

export default Generate;