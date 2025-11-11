import express from 'express';
import { createShortUrl } from '../controllers/short_url.controller.js';
import { rateLimit } from '../middlewares/rateLimit.middleware.js';
const router = express.Router();

router.post("/", rateLimit, createShortUrl);

export default router;