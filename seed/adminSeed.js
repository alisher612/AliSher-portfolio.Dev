// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const Admin = require("../models/admin");

// mongoose.connect("mongodb://127.0.0.1:27017/portfolio-cms");

// async function resetAdmin() {
//   try {
//     // 1. Delete existing admin(s)
//     await Admin.deleteMany({});

//     console.log("Old admin deleted");

//     // 2. Create new hashed password
//     const hashedPassword = await bcrypt.hash("Ali_Sher4u23", 10);

//     // 3. Create new admin
//     const admin = new Admin({
//       username: "Ali Sher",
//       password: hashedPassword,
//     });

//     await admin.save();

//     console.log("New admin created successfully");

//   } catch (err) {
//     console.log(err);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// resetAdmin();



require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

mongoose.connect(process.env.MONGO_URI);

async function resetAdmin() {
  try {
    await Admin.deleteMany({});
    console.log("Old admin deleted");

    const hashedPassword = await bcrypt.hash("Ali_Sher4u23", 10);

    const admin = new Admin({
      username: "Ali Sher",
      password: hashedPassword,
    });

    await admin.save();

    console.log("New admin created successfully");

  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

resetAdmin();