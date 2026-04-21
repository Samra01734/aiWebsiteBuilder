const extractJson = async (text) => {
  try {
    if (!text) return null;

    // remove markdown only
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // try direct parse first
    try {
      return JSON.parse(cleaned);
    } catch {}

    // fallback: find JSON block safely
    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) return null;

    const parsed = JSON.parse(match[0]);

    // validate required keys
    if (!parsed.message || !parsed.code) return null;

    return parsed;

  } catch (error) {
    console.log("Extract error:", error.message);
    return null;
  }
};

export default extractJson;