import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    accountName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
    },
    accountType: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
