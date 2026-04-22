const generateResponse = async (prompt) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is missing in .env file");
    }

    console.log("🔑 KEY:", apiKey.substring(0, 15));

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AI Website Builder",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    });

    const data = await res.json();

    console.log("🔵 FULL RESPONSE:", data);

    if (!res.ok) {
      throw new Error(
        `OpenRouter error ${res.status}: ${data?.error?.message || JSON.stringify(data)}`
      );
    }

    return data?.choices?.[0]?.message?.content || "No response";

  } catch (error) {
    console.log("❌ OPENROUTER FAILED:", error.message);
    throw error;
  }
};

export default generateResponse;