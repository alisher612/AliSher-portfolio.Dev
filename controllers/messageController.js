const Message = require("../models/message");

// Save Message
module.exports.createMessage = async (req, res) => {
  try {
    await Message.create(req.body);

    req.flash("success", "Message sent successfully!");
    res.redirect("/#contact");

  } catch (err) {
    console.log(err);
    req.flash("error", "Failed to send message");
    res.redirect("/#contact");
  }
};

// Admin View Messages
module.exports.viewMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.render("admin/messages", { messages });
  } catch (err) {
    console.log(err);
    res.send("Error loading messages");
  }
};

// Reply Page
module.exports.replyPage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  res.render("admin/messages/reply", { message });
};

// Send Reply
module.exports.sendReply = async (req, res) => {
  const { reply } = req.body;

  await Message.findByIdAndUpdate(req.params.id, {
    reply,
    replied: true,
  });

  req.flash("success", "Reply sent successfully!");
  res.redirect("/admin/messages");
};

// Delete Message
module.exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    req.flash("success", "Message deleted successfully!");
    res.redirect("/admin/messages");
  } catch (err) {
    console.log(err);
    req.flash("error", "Failed to delete message");
    res.redirect("/admin/messages");
  }
};