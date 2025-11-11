import express from "express"
import { deleteMyUrlbyId, getAllUserUrls } from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/urls",authMiddleware, getAllUserUrls);
router.delete("/url/:id", authMiddleware, deleteMyUrlbyId);

export default router