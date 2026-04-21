import express from "express";
import isAuth from "../middleware/isAuth.js";

// ⚠️ IMPORTANT: name same hona chahiye controller jaisa
import { genrateWebsite, getWebsiteById } from "../controllers/website.controllers.js";

const websiteRouter = express.Router();

// ✅ correct router variable + correct function name
websiteRouter.post("/generate", isAuth, genrateWebsite);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);


export default websiteRouter;

