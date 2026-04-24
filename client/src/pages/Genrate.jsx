import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Loader2, Wand2, Eye } from "lucide-react";
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
  const [websiteId, setWebsiteId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // ✅ MAIN FIXED FUNCTION
  const handleGenerateWebsite = async () => {
    try {
      setLoading(true);
      setError("");
      setGeneratedHtml("");

      const token = localStorage.getItem("token");

      // ❌ EMPTY CHECK
      if (!prompt.trim()) {
        setError("Please enter a prompt");
        setLoading(false);
        return;
      }

      // 🔥 API CALL (FIXED)
      const res = await axios.post(
        `${serverUrl}/api/website/generate`,
        { prompt: prompt.trim() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      // ✅ SUCCESS RESPONSE
      if (data?.data?.code) {
        setGeneratedHtml(data.data.code);
        setWebsiteId(data.data._id);
        showToast("🚀 Website generated successfully");
      } else {
        setError(data?.message || "Generation failed");
        showToast("❌ Failed");
      }

    } catch (err) {
      console.log("ERROR:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Server error");
      showToast("❌ Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addSuggestion = (text) => setPrompt(text);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-20 right-5 bg-purple-600 px-4 py-2 rounded-lg z-50">
          {toast}
        </div>
      )}

      {/* TOP BAR */}
      <div className="fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-purple-500/20 z-50">

        <button onClick={() => navigate("/dashboard")}>
          <ArrowLeft />
        </button>

        <div className="flex items-center gap-2 text-purple-300 font-semibold">
          <Wand2 size={18} />
          AI Website Builder
        </div>

        {websiteId ? (
          <button
            onClick={() => navigate(`/editor/${websiteId}`)}
            className="flex items-center gap-2 text-xs bg-purple-600 px-3 py-2 rounded-lg"
          >
            <Eye size={14} />
            View Website
          </button>
        ) : (
          <div className="text-sm text-purple-400">AI Mode</div>
        )}
      </div>

      {/* MAIN */}
      <div className="max-w-3xl mx-auto px-6 pt-28">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold">
            Build with <span className="text-purple-400">AI</span>
          </h1>
        </motion.div>

        {/* SUGGESTIONS */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => addSuggestion(s)}
              className="text-xs px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
            >
              {s}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your website..."
          className="w-full mt-6 h-40 p-4 bg-black border border-purple-500/30 rounded-xl"
        />

        {/* ERROR */}
        {error && (
          <div className="text-red-400 mt-3 text-sm">
            {error}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleGenerateWebsite}
          disabled={loading}
          className="mt-5 w-full py-3 bg-purple-600 rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating...
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
        <div className="mt-10 border-t border-purple-500/20">
          <iframe
            srcDoc={generatedHtml}
            className="w-full h-[700px] bg-white"
            title="preview"
          />
        </div>
      )}
    </div>
  );
};

export default Generate;