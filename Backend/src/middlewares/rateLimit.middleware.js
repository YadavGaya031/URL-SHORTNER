import { arcjetClient } from "../config/arcjet.config.js";

export const rateLimit = async (req, res, next) => {
  try {
    const result = await arcjetClient.check({
      userId: req.user?._id?.toString() || req.ip,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method,
    });

    if (result?.action === "BLOCK") {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Slow down.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Rate Limit Error:", error);
    next();
  }
};
