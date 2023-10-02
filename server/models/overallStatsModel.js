import mongoose from "mongoose";

const OverallStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    year: {
      type: Number,
      required: true,
    },
    totalBalance: {
      type: Number,
      required: true,
    },
    accounts: {
      type: Map,
      of: Number,
    },
    monthlyData: {
      type: Map,
      of: {
        totalBalance: Number,
        accounts: {
          type: Map,
          of: Number,
        },
      },
    },
    dailyData: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStats = mongoose.model("OverallStats", OverallStatsSchema);
export default OverallStats;
