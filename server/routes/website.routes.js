import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  genrateWebsite,
  getWebsiteById,
  getUserWebsites,
} from "../controllers/website.controllers.js";

const router = express.Router();

router.post("/generate", isAuth, genrateWebsite);
router.get("/", isAuth, getUserWebsites);
router.get("/:id", isAuth, getWebsiteById);

export default router;