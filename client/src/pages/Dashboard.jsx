import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Plus,
  Globe,
  Sparkles,
  LayoutGrid,
  Rocket,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const websites = []; // replace with backend later

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#a855f740,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70f_1px,transparent_1px),linear-gradient(to_bottom,#a855f70f_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/50">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl border border-purple-500/30 hover:bg-purple-500/10 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="text-2xl font-bold tracking-wide">
            GenWeb<span className="text-purple-400">.ai</span>
          </div>
        </div>

        {/* RIGHT USER */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-zinc-400">Welcome</p>
            <p className="text-sm font-semibold text-purple-300">
              {userData?.name}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold border border-purple-400/40">
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              getInitials(userData?.name)
            )}
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="px-6 pt-10">

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold leading-tight"
        >
          Build, Deploy & Scale
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            AI Websites
          </span>
        </motion.h1>

        <p className="text-zinc-400 mt-4 max-w-lg">
          Create powerful websites using AI. Manage everything from your dashboard.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-6">

          <button
            onClick={() => navigate("/generate")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition shadow-lg shadow-purple-500/20"
          >
            <Plus size={18} />
            Create New Website
          </button>

          <button className="px-5 py-3 rounded-2xl border border-purple-500/30 hover:bg-purple-500/10 transition">
            View Templates
          </button>

        </div>
      </div>

      {/* STATS CARDS */}
      <div className="px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">

        {[
          { icon: Rocket, label: "Projects", value: "0" },
          { icon: Globe, label: "Deployed", value: "0" },
          { icon: Sparkles, label: "AI Credits", value: userData?.credits || 0 },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-black/40 border border-purple-500/20 hover:border-purple-400/50 transition"
          >
            <item.icon className="text-purple-400 mb-2" />
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <p className="text-zinc-400 text-sm">{item.label}</p>
          </div>
        ))}

      </div>

      {/* PROJECTS SECTION */}
      <div className="px-6 mt-12">

        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid size={18} />
          <h2 className="text-xl font-semibold">Your Websites</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {websites.length === 0 ? (
            <div className="col-span-full text-center py-16 rounded-2xl border border-purple-500/20 bg-black/30 backdrop-blur-xl">
              <Sparkles className="mx-auto text-purple-400 mb-3" size={30} />
              <h3 className="text-lg font-semibold">No websites yet</h3>
              <p className="text-zinc-500 text-sm mt-1">
                Create your first AI-powered website
              </p>
            </div>
          ) : (
            websites.map((site, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-5 rounded-2xl border border-purple-500/20 bg-black/40 hover:border-purple-400/60 transition"
              >
                <h3 className="text-lg font-semibold">{site.title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{site.desc}</p>

                <button className="mt-4 text-purple-400 text-sm">
                  Open Project →
                </button>
              </motion.div>
            ))
          )}

        </div>
      </div>

    </div>
  );
};

export default Dashboard;