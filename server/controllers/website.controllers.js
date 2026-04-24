import generateResponse from "../config/openRouter.js";
import Website from "../models/website.model.js";

/**
 * 🔥 STRONG JSON EXTRACTOR (FIXED)
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

    // ✅ only check code (message optional)
    if (!parsed.code) return null;

    return parsed;

  } catch (err) {
    console.log("❌ JSON Parse Error:", err.message);
    return null;
  }
};

/**
 * MASTER PROMPT
 */
const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT AND SENIOR UI/UX ENGINEER.

YOU GENERATE HIGH-END PRODUCTION READY WEBSITES USING ONLY HTML, CSS, JAVASCRIPT.

-----------------------------------------
USER REQUEST:
{USER_PROMPT}
-----------------------------------------

RETURN ONLY JSON:
{
  "message": "short professional sentence",
  "code": "<full html document>"
}

NO markdown, NO explanation.

FEATURES:
- Responsive
- SPA
- Navbar
- Animations
- Clean UI
`;

/**
 * CREDIT SYSTEM
 */
const getUserCredits = (user) => user?.credits ?? 10;

const deductCredits = async (user) => {
  user.credits = (user.credits || 10) - 1;
  await user.save(); // 🔥 IMPORTANT (missing before)
};

/**
 * 🔥 GENERATE WEBSITE (FIXED)
 */
export const genrateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    const user = req.user;

    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    if (getUserCredits(user) <= 0) {
      return res.status(403).json({ message: "Insufficient credits" });
    }

    const finalPrompt = masterPrompt.replace("{USER_PROMPT}", prompt);

    const raw = await generateResponse(finalPrompt);

    console.log("🧠 AI RAW:", raw?.slice(0, 200));

    const parsed = extractJson(raw);

    if (!parsed) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        debug: raw,
      });
    }

    // ✅ SAVE WEBSITE
    const website = await Website.create({
      user: user._id,
      code: parsed.code,
      prompt,
    });

    await deductCredits(user);

    return res.status(200).json({
      success: true,
      creditsLeft: user.credits,
      data: website,
    });

  } catch (error) {
    console.log("❌ GENERATE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🔥 GET WEBSITE BY ID
 */
export const getWebsiteById = async (req, res) => {
  try {
    const { id } = req.params;

    const website = await Website.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(404).json({ message: "website not found" });
    }

    return res.status(200).json(website);

  } catch (error) {
    console.log("❌ GET BY ID ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🔥 EDIT WEBSITE (IMPROVED)
 */
export const changes = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { id } = req.params;
    const user = req.user;

    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }

    if (!id) {
      return res.status(400).json({ message: "website id required" });
    }

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const website = await Website.findOne({
      _id: id,
      user: user._id,
    });

    if (!website) {
      return res.status(404).json({ message: "website not found" });
    }

    if (getUserCredits(user) <= 0) {
      return res.status(403).json({ message: "Insufficient credits" });
    }

    const editPrompt = `
YOU ARE A SENIOR FRONTEND ENGINEER.

UPDATE EXISTING WEBSITE.

CURRENT CODE:
${website.code}

USER REQUEST:
${prompt}

RETURN JSON:
{
  "message":"updated",
  "code":"<full html>"
}
`;

    const raw = await generateResponse(editPrompt);

    console.log("✏️ EDIT AI RAW:", raw?.slice(0, 200));

    const parsed = extractJson(raw);

    if (!parsed) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        debug: raw,
      });
    }

    website.code = parsed.code;
    website.lastEditedPrompt = prompt;

    await website.save();
    await deductCredits(user);

    return res.status(200).json({
      success: true,
      creditsLeft: user.credits,
      data: website,
    });

  } catch (error) {
    console.log("❌ EDIT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🔥 GET ALL USER WEBSITES (NO CHANGE)
 */
export const getUserWebsites = async (req, res) => {
  try {
    const websites = await Website.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(websites);

  } catch (error) {
    console.log("❌ GET ALL ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};