// const bcrypt = require("bcrypt");

// module.exports.renderLogin = (req, res) => {
//   res.render("admin/login");
// };

// module.exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   if (email !== process.env.ADMIN_EMAIL) {
//     return res.redirect("/admin-login");
//   }

//   const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

//   if (!isMatch) {
//     return res.redirect("/admin-login");
//   }

//   req.session.admin = true;
//   res.redirect("/admin/dashboard");
// };

// module.exports.logout = (req, res) => {
//   req.session.destroy();
//   res.redirect("/admin-login");
// };

// module.exports.dashboard = (req, res) => {
//   res.render("admin/dashboard");
// };


const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const DeliveredProject = require("../models/deliveredProject");
const Project = require("../models/project");
const Message = require("../models/message");

module.exports.renderLogin = (req, res) => {
  res.render("admin/login");
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.send("Invalid username");

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.send("Invalid password");

  req.session.admin = admin._id;
  res.redirect("/admin/dashboard");
};

// module.exports.dashboard = (req, res) => {
//   res.render("admin/dashboard"); // 🔥 THIS WAS MISSING MOST LIKELY
// };

module.exports.dashboard = async (req, res) => {
  const projectsCount = await Project.countDocuments();
  const messagesCount = await Message.countDocuments();
  const deliveredCount = await DeliveredProject.countDocuments();

  res.render("admin/dashboard", {
    projectsCount,
    messagesCount,
    deliveredCount,
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin-login");
  });
};