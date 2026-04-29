// // const Project = require("../models/project");

// // module.exports.getProjects = async (req, res) => {
// //   const projects = await Project.find({ featured: true }).limit(6);
// //   res.render("projects/index", { projects });
// // };

// const Project = require("../models/project");

// // Featured projects (for homepage or section)
// module.exports.getProjects = async (req, res) => {
//   const projects = await Project.find({});
//   res.render("projects/index", { projects });
// };

// // Single project page
// module.exports.getSingleProject = async (req, res) => {
//   const project = await Project.findById(req.params.id);

//   if (!project) {
//     return res.redirect("/projects");
//   }

//   res.render("projects/show", { project });
// };

///////////////////////////////////////////////////////////////
// const Project = require("../models/project");

// // -------------------- ALL PROJECTS --------------------
// module.exports.getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({}).sort({ createdAt: -1 });
//     res.render("projects/index", { projects });
//   } catch (err) {
//     console.log(err);
//     req.flash("error", "Cannot load projects");
//     res.redirect("/");
//   }
// };

// // -------------------- SINGLE PROJECT --------------------
// module.exports.getSingleProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project) {
//       req.flash("error", "Project not found");
//       return res.redirect("/projects");
//     }

//     res.render("projects/show", { project });
//   } catch (err) {
//     console.log(err);
//     req.flash("error", "Something went wrong");
//     res.redirect("/projects");
//   }
// };
const Project = require("../models/project");
const cloudinary = require("../config/cloudinary");

// PUBLIC
const getProjects = async (req, res) => {
  const projects = await Project.find({});
  res.render("projects/index", { projects });
};

const getSingleProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.redirect("/projects");

  const moreProjects = await Project.find({
    _id: { $ne: project._id }
  }).limit(3);

  res.render("projects/show", { project, moreProjects });
};

// ADMIN
const index = async (req, res) => {
  const projects = await Project.find({});
  res.render("admin/projects/index", { projects });
};

const newForm = (req, res) => {
  res.render("admin/projects/new");
};

const create = async (req, res) => {
  try {
    const data = req.body.project;

    // technologies string → array
    data.technologies = data.technologies
      ? data.technologies.split(",").map(t => t.trim())
      : [];

    // image from multer
   if (req.file) {
  data.image = {
    url: req.file.path,
    public_id: req.file.filename,
  };
} else {
  return res.send("Image is required");
}

    await Project.create(data);

    res.redirect("/admin/projects");
  } catch (err) {
    console.log(err);
    res.send("Error creating project");
  }
};

const editForm = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render("admin/projects/edit", { project });
};

const update = async (req, res) => {
  try {
    const data = req.body.project;

    data.technologies = data.technologies
      ? data.technologies.split(",").map(t => t.trim())
      : [];

    if (req.file) {
  data.image = {
    url: req.file.path,
    public_id: req.file.filename,
  };
}

    await Project.findByIdAndUpdate(req.params.id, data);

    res.redirect("/admin/projects");
  } catch (err) {
    console.log(err);
    res.send("Error updating project");
  }
};

const remove = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.image && project.image.public_id) {
    await cloudinary.uploader.destroy(project.image.public_id);
  }

  await Project.findByIdAndDelete(req.params.id);

  res.redirect("/admin/projects");
};

module.exports = {
  getProjects,
  getSingleProject,
  index,
  newForm,
  create,
  editForm,
  update,
  delete: remove
};