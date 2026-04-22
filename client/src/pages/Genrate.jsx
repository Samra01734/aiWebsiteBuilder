import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Loader2, Wand2 } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App";

const suggestions = [
  "Modern SaaS landing page with pricing section",
  "Portfolio website for developer with animations",
  "Startup landing page with hero + testimonials",
  "E-commerce homepage with product grid",
];

const Generate = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [error, setError] = useState("");

  const handleGenerateWebsite = async () => {
    try {
      setLoading(true);
      setError("");
      setGeneratedHtml("");

      const res = await axios.post(
        `${serverUrl}/api/website/generate`,
        { prompt },
        { withCredentials: true }
      );

      const data = res.data;

      if (data?.data?.code) setGeneratedHtml(data.data.code);
      else if (data?.code) setGeneratedHtml(data.code);
      else setError(data?.message || "Generation failed");

    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSuggestion = (text) => setPrompt(text);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#a855f740,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70f_1px,transparent_1px),linear-gradient(to_bottom,#a855f70f_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* TOP BAR */}
      <div className="fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-purple-500/20 z-50">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-purple-300 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-2 text-purple-300 font-semibold">
          <Wand2 size={18} />
          AI Website Builder
        </div>

        <div className="text-sm text-purple-400">
          Credits: <span className="text-white">∞</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-3xl mx-auto px-6 pt-28">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold leading-tight">
            Build websites with <span className="text-purple-400">AI magic</span>
          </h1>

          <p className="text-zinc-400 mt-3">
            Describe your idea — and get a production-ready website instantly
          </p>
        </motion.div>

        {/* SUGGESTIONS */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => addSuggestion(s)}
              className="text-xs px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className="mt-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Create a modern SaaS landing page..."
            className="w-full h-44 p-5 rounded-2xl bg-black/40 border border-purple-500/30 focus:border-purple-400 outline-none resize-none backdrop-blur-xl"
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleGenerateWebsite}
          disabled={!prompt.trim() || loading}
          className="mt-6 w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] transition disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating magic...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Website
            </>
          )}
        </button>
      </div>

      {/* PREVIEW */}
      {generatedHtml && (
        <div className="mt-12 border-t border-purple-500/20">

          <div className="flex justify-center py-3 text-purple-300 text-sm">
            Live Preview
          </div>

          <div className="bg-white">
            <iframe
              title="preview"
              srcDoc={generatedHtml}
              className="w-full h-[750px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Generate;