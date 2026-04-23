import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
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

  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  // ✅ FETCH WEBSITES FROM BACKEND
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8000/api/websites/${userData?._id}`
        );

        setWebsites(res.data || []);
      } catch (error) {
        console.log("Error fetching websites:", error);
        setWebsites([]);
      } finally {
        setLoading(false);
      }
    };

    if (userData?._id) {
      fetchWebsites();
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-purple-500/20 backdrop-blur-xl bg-black/50">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl border border-purple-500/30 hover:bg-purple-500/10 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="text-2xl font-bold">
            GenWeb<span className="text-purple-400">.ai</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-zinc-400">Welcome</p>
            <p className="text-sm font-semibold text-purple-300">
              {userData?.name}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
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

      {/* HERO */}
      <div className="px-6 pt-10">
        <h1 className="text-5xl font-bold">
          Build AI Websites
        </h1>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/generate")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600"
          >
            <Plus size={18} />
            Create New Website
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="px-6 mt-10 grid grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl border border-purple-500/20">
          <Rocket className="text-purple-400" />
          <h3 className="text-2xl">{websites.length}</h3>
          <p>Projects</p>
        </div>

        <div className="p-5 rounded-2xl border border-purple-500/20">
          <Globe className="text-purple-400" />
          <h3 className="text-2xl">0</h3>
          <p>Deployed</p>
        </div>

        <div className="p-5 rounded-2xl border border-purple-500/20">
          <Sparkles className="text-purple-400" />
          <h3 className="text-2xl">{userData?.credits || 0}</h3>
          <p>AI Credits</p>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="px-6 mt-12">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <LayoutGrid size={18} />
          Your Websites
        </h2>

        {loading ? (
          <p className="text-zinc-400 mt-5">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

            {websites.length === 0 ? (
              <div className="col-span-full text-center py-16 border border-purple-500/20 rounded-2xl">
                <Sparkles className="mx-auto text-purple-400 mb-3" />
                No websites yet
              </div>
            ) : (
              websites.map((site, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-2xl border border-purple-500/20"
                >
                  <h3 className="text-lg font-semibold">
                    {site.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {site.description}
                  </p>

                  <button className="mt-4 text-purple-700 text-sm ">
                    Open →
                  </button>
                </motion.div>
              ))
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;