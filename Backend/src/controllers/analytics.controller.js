import Analytics from "../models/analytics.model.js";

export const getAnalyticsForShort = async (req, res) => {
  const { slug } = req.params;
  const limit = parseInt(req.query.limit) || 100;
  const skip = parseInt(req.query.skip) || 0
  // console.log(req.body);

  const [total, items, summary] = await Promise.all([
    Analytics.countDocuments({ short_url: slug }),
      Analytics.find({ short_url: slug })
      .sort({ timestamp: -1 })
      .skip(Number(skip))
      .limit(Number(limit)),
    Analytics.aggregate([
      { $match: { short_url: slug } },
      {
        $group: {
          _id: {
            browser: "$browser",
            os: "$os",
            device: "$device",
            country: "$country",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]),
  ]);

  res.status(200).json({ total, items, summary });
};
