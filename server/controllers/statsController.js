import OverallStats from "../models/overallStatsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let stats = await OverallStats.find({ userId })

  res.status(200).json({
    stats,
  });
});
