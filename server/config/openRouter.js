const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

const generateResponse = async (prompt) => {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing in .env file");
  }

  console.log("🔑 KEY:", apiKey.substring(0, 15));

  const res = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",

      // 🔥 MOST IMPORTANT (tumhare code me missing hai)
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "AI Website Builder",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    }),
  });

  const data = await res.json();

  console.log("🔵 FULL RESPONSE:", data);

  if (!res.ok) {
    throw new Error(
      `OpenRouter error ${res.status}: ${data?.error?.message || "Unknown"}`
    );
  }

  return data?.choices?.[0]?.message?.content || "No response";
};

export default generateResponse;