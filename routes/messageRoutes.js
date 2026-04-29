const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const { isAdmin } = require("../middleware/adminAuth");

// PUBLIC ROUTE
router.post("/contact", messageController.createMessage);

// ADMIN ROUTES
router.get("/admin/messages", isAdmin, messageController.viewMessages);

router.get("/admin/messages/:id/reply", isAdmin, messageController.replyPage);

router.post("/admin/messages/:id/reply", isAdmin, messageController.sendReply);

// ✅ ADD THIS
router.delete("/admin/messages/:id", isAdmin, messageController.deleteMessage);

module.exports = router;