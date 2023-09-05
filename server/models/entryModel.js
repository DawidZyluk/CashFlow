import mongoose from "mongoose";

const entrySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;