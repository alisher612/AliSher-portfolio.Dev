const mongoose = require("mongoose");

const deliveredProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: {
  url: String,
  public_id: String,
},
    liveLink: String,
    // clientName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveredProject", deliveredProjectSchema);