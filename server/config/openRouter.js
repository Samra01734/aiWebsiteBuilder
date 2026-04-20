const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

const generateResponse = async (prompt) => {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();   // trim removes accidental spaces

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing in .env file");
  }

  console.log("🔑 Using OpenRouter API Key (first 20 chars):", apiKey.substring(0, 20) + "...");

  const res = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("❌ OpenRouter Error Details:", {
      status: res.status,
      error: errorData.error || errorData
    });
    throw new Error(`OpenRouter API error: ${res.status} - ${errorData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "No response generated";
};

export default generateResponse;