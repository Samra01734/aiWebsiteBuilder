import generateResponse from "../config/openRouter.js";

// =====================
// GET CURRENT USER
// =====================
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({
        success: true,
        user: null,
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {
    console.log("Get Current User Error:", error);

    return res.status(500).json({
      success: false,
      message: `Get current user error: ${error.message}`,
    });
  }
};

// =====================
// GENERATE DEMO
// =====================
export const generatedemo = async (req, res) => {
  try {
    const result = await generateResponse("hello");

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.log("Generate Demo Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};