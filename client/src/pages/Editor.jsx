import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ChessKing, Send, Rocket, Code, Loader2 } from "lucide-react";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [website, setWebsite] = useState(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);

  const chatRef = useRef(null);

  // ================= AUTO SCROLL CHAT =================
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [website]);

  // ================= FETCH WEBSITE =================
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-id/${id}`,
          { withCredentials: true }
        );
        setWebsite(result.data);
      } catch (error) {
        setError(error?.response?.data?.message || "Something went wrong");
      }
    };

    if (id) handleGetWebsite();
  }, [id]);

  // ================= SEND MESSAGE =================
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      message: input,
    };

    // 🔥 Optimistic UI update
    setWebsite((prev) => ({
      ...prev,
      conversation: [...(prev?.conversation || []), userMessage],
    }));

    setInput("");
    setLoading(true);
    setThinking(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/website/chat/${id}`,
        { message: input },
        { withCredentials: true }
      );

      setWebsite(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Chat failed");
    } finally {
      setLoading(false);
      setThinking(false);
    }
  };

  // ================= DEPLOY =================
  const handleDeploy = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/website/deploy/${id}`,
        {},
        { withCredentials: true }
      );

      alert("🚀 Deployed Successfully");
      console.log(res.data);
    } catch (err) {
      setError("Deployment failed");
    }
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">

      {/* ================= LEFT PANEL ================= */}
      <aside className="w-[420px] border-r border-white/10 flex flex-col">

        {/* HEADER */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
          <span className="font-semibold truncate">
            {website.title || "Untitled"}
          </span>

          <button
            onClick={handleDeploy}
            className="flex items-center gap-1 text-xs bg-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-700"
          >
            <Rocket size={14} /> Deploy
          </button>
        </div>

        {/* CHAT */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >
          {website?.conversation?.length === 0 && (
            <div className="text-center text-zinc-500 text-sm mt-10">
              Start building your website ✨
            </div>
          )}

          {website?.conversation?.map((m, i) => {
            const isUser = m.role === "user";

            return (
              <div
                key={i}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <ChessKing className="mr-2 mt-1 text-purple-400" size={16} />
                )}

                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap
                  ${
                    isUser
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white/10 text-zinc-200 rounded-bl-none border border-white/10"
                  }`}
                >
                  <p className="text-[10px] text-zinc-400 mb-1">
                    {isUser ? "You" : "AI"}
                  </p>
                  {m.message}
                </div>
              </div>
            );
          })}

          {/* AI THINKING INDICATOR */}
          {thinking && (
            <div className="flex items-center gap-2 text-purple-400 text-sm">
              <Loader2 className="animate-spin" size={14} />
              AI is thinking...
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-white/10 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your website..."
            className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-purple-600 px-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </aside>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
          <p className="text-sm text-zinc-400">Live Preview</p>

          <button
            onClick={() => navigate(`/code/${id}`)}
            className="flex items-center gap-1 text-xs border border-purple-500 px-3 py-1.5 rounded-lg hover:bg-purple-500/10"
          >
            <Code size={14} /> View Code
          </button>
        </div>

        {/* PREVIEW */}
        <div className="flex-1 bg-white relative">

          {!website?.previewUrl ? (
            <div className="h-full flex items-center justify-center text-zinc-500 bg-black">
              No preview yet
            </div>
          ) : (
            <iframe
              src={website.previewUrl}
              title="preview"
              className="w-full h-full border-none"
            />
          )}

          {/* LOADING OVERLAY */}
          {loading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              Updating preview...
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Editor;