import express from 'express';
import { getQRCode } from '../controllers/qr.controller.js';

const router = express.Router();

router.get("/qr/:slug", getQRCode);

export default router;