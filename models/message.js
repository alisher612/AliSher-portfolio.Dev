const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },

    // NEW: admin reply system
    reply: {
      type: String,
      default: "",
    },

    replied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);