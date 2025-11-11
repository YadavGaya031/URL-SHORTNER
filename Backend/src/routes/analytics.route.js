import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAnalyticsForShort } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get("/:slug", authMiddleware, getAnalyticsForShort);

export default router;