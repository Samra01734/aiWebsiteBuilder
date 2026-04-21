import generateResponse from "../config/openRouter.js";

/**
 * SAFE JSON EXTRACTOR
 */
const extractJson = (text) => {
  try {
    if (!text) return null;

    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;

    const parsed = JSON.parse(match[0]);

    if (!parsed.message || !parsed.code) return null;

    return parsed;
  } catch (err) {
    console.log("JSON Parse Error:", err.message);
    return null;
  }
};

/**
 * MASTER PROMPT (UPGRADED + CREDIT SYSTEM)
 */
const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT AND SENIOR UI/UX ENGINEER.

YOU GENERATE HIGH-END PRODUCTION READY WEBSITES USING ONLY HTML, CSS, JAVASCRIPT.

-----------------------------------------
USER REQUEST:
{USER_PROMPT}
-----------------------------------------

CREDIT SYSTEM RULES:
- Each request costs 1 credit
- If user has insufficient credits, return:
{"message":"Insufficient credits","code":""}

- Always assume user has limited credits and optimize output

-----------------------------------------
OUTPUT RULES:
Return ONLY valid JSON:
{
  "message": "short professional sentence",
  "code": "<full html document>"
}

NO markdown, NO explanation, NO extra text.

-----------------------------------------
FEATURE REQUIREMENTS:
- Fully responsive design
- SPA navigation (Home, About, Services, Contact)
- Smooth scrolling
- Sticky navbar
- Mobile hamburger menu
- Form validation (JS)
- Active nav highlight
- Animations (scroll reveal)
- No horizontal scroll
- Professional UI/UX
`;

/**
 * FAKE CREDIT SYSTEM (replace with DB later)
 */
const getUserCredits = (user) => {
  // TODO: replace with DB field (user.credits)
  return user?.credits ?? 10;
};

const deductCredits = (user) => {
  // TODO: update DB here
  user.credits = (user.credits || 10) - 1;
};

/**
 * MAIN CONTROLLER
 */
export const genrateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    const user = req.user;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "prompt is required",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    // CREDIT CHECK
    const credits = getUserCredits(user);

    if (credits <= 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient credits",
      });
    }

    // REPLACE USER PROMPT IN MASTER PROMPT
    const finalPrompt = masterPrompt.replace("{USER_PROMPT}", prompt);

    // CALL AI
    const raw = await generateResponse(finalPrompt);

    console.log("RAW AI RESPONSE:\n", raw);

    // PARSE RESPONSE
    const parsed = extractJson(raw);

    if (!parsed) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        debug: raw?.slice(0, 300),
      });
    }

    // DEDUCT CREDIT AFTER SUCCESS
    deductCredits(user);

    // SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      creditsLeft: user.credits,
      data: parsed,
    });

  } catch (error) {
    console.log("Website Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};