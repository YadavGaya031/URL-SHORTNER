import arcjet from "@arcjet/node";

export const arcjetClient = arcjet({
  key: process.env.ARCJET_API_KEY,
  rules: [
    {
      priority: 1,
      action: "BLOCK",
      rateLimit: {
        interval: "1m",
        max: 10,
      },
    },
  ],
});
