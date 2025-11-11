import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { adminDeletebySlug, getAllUrls, toggleUrls } from '../controllers/admin.controller.js';

const router = express.Router();

router.get("/all-urls", authMiddleware, authorizeRoles("admin"), getAllUrls);
router.delete("/url/:slug", authMiddleware, authorizeRoles("admin"), adminDeletebySlug);
router.patch("/url/:slug/toggle", authMiddleware, authorizeRoles("admin"), toggleUrls)
export default router