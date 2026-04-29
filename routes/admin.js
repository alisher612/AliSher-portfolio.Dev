const express = require("express");
const router = express.Router();

const admin = require("../controllers/adminController");
const projectController = require("../controllers/projectController");
const { isAdmin } = require("../middleware/adminAuth");
const deliveredController = require("../controllers/deliveredController");
const upload = require("../config/multer");

// ---------------- LOGIN ----------------
router.get("/admin-login", admin.renderLogin);
router.post("/admin-login", admin.login);

// ---------------- DASHBOARD ----------------
router.get("/admin/dashboard", isAdmin, admin.dashboard);

// ---------------- LOGOUT ----------------
router.get("/admin/logout", admin.logout);

// ---------------- PROJECTS ----------------
router.get("/admin/projects", isAdmin, projectController.index);
router.get("/admin/projects/new", isAdmin, projectController.newForm);

router.post(
  "/admin/projects",
  isAdmin,
  upload.single("image"),
  projectController.create
);

router.get("/admin/projects/:id/edit", isAdmin, projectController.editForm);

router.put(
  "/admin/projects/:id",
  isAdmin,
  upload.single("image"),
  projectController.update
);

router.delete("/admin/projects/:id", isAdmin, projectController.delete);

// ---------------- DELIVERED ----------------
router.get("/admin/delivered", isAdmin, deliveredController.index);
router.get("/admin/delivered/new", isAdmin, deliveredController.newForm);

router.post(
  "/admin/delivered",
  isAdmin,
  upload.single("image"),
  deliveredController.create
);

router.get("/admin/delivered/:id/edit", isAdmin, deliveredController.editForm);

router.put(
  "/admin/delivered/:id",
  isAdmin,
  upload.single("image"),
  deliveredController.update
);

router.delete("/admin/delivered/:id", isAdmin, deliveredController.delete);

// ✅ THIS WAS MISSING
module.exports = router;