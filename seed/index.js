const mongoose = require("mongoose");
const Project = require("../models/project");
const projects = require("./data");

mongoose.connect("mongodb://127.0.0.1:27017/portfolio-cms");

const seedDB = async () => {
  try {
    await Project.deleteMany({});
    console.log("🗑️ Old projects removed");

    await Project.insertMany(projects);
    console.log("✅ New projects seeded successfully");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.connection.close();
  }
};

seedDB();