import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);

router.get("/all", protectRoute, getAllPosts);

export default router;