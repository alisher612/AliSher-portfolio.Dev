const DeliveredProject = require("../models/deliveredProject");
const cloudinary = require("../config/cloudinary");

// ADMIN: list
module.exports.index = async (req, res) => {
  const projects = await DeliveredProject.find({});
  res.render("admin/delivered/index", { projects });
};

// NEW form
module.exports.newForm = (req, res) => {
  res.render("admin/delivered/new");
};

// CREATE
// CREATE
module.exports.create = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
  data.image = {
    url: req.file.path,
    public_id: req.file.filename,
  };
} else {
  return res.send("Image is required");
}

    await DeliveredProject.create(data);

    res.redirect("/admin/delivered");
  } catch (err) {
    console.log(err);
    res.send("Error creating delivered project");
  }
};

// UPDATE
module.exports.update = async (req, res) => {
  try {
    const data = req.body;

   if (req.file) {
  data.image = {
    url: req.file.path,
    public_id: req.file.filename,
  };
}

    await DeliveredProject.findByIdAndUpdate(req.params.id, data);

    res.redirect("/admin/delivered");
  } catch (err) {
    console.log(err);
    res.send("Error updating delivered project");
  }
};

// EDIT form
module.exports.editForm = async (req, res) => {
  const project = await DeliveredProject.findById(req.params.id);
  res.render("admin/delivered/edit", { project });
};

// DELETE
module.exports.delete = async (req, res) => {
  const project = await DeliveredProject.findById(req.params.id);

  if (project.image && project.image.public_id) {
    await cloudinary.uploader.destroy(project.image.public_id);
  }

  await DeliveredProject.findByIdAndDelete(req.params.id);

  res.redirect("/admin/delivered");
};