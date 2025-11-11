import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { aiSlugController } from "../controllers/ai.controller.js";

const router = express.Router();
router.post('/slug', authMiddleware, aiSlugController);

export default router;