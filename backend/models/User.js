const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // ✅ allows multiple nulls
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    mobile: {
      type: String,
      required: [true, "Please add a mobile number"],
      unique: true,
      match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please add a valid mobile number"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "partner"],
      default: "user",
    },
    picture: {
      type: String,
    },
    CAT: {
      type: String,
      default: "Lower C",
    },
    address: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
    },
    employerName: {
      type: String,
      trim: true,
    },
    monthlyIncome: {
      type: Number,
      min: 0,
    },
    whatAppNotification: {
      type: String,
      default: false,
    },
    iskyc: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
      status: {
        type: String,
        enum: ["created", "attempted", "successful", "failed", "refunded"],
        default: "created",
      },
      amount: { type: Number },
      currency: { type: String, default: "INR" },
      paidAt: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
