// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema({
//   title: String,
//   category: String,
//   description: String,
//   image: String,
//   technologies: [String],
//   link: String,
//   github: String,
//   featured: {
//     type: Boolean,
//     default: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Project", projectSchema);

///////////////////////////////////


// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     category: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     image: {
//       type: String,
//       required: true,
//     },

//     technologies: [
//       {
//         type: String,
//       },
//     ],

//     link: {
//       type: String,
//       default: "#",
//     },

//     github: {
//       type: String,
//       default: "#",
//     },

//     featured: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Project", projectSchema);

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: {
  url: String,
  public_id: String,
},

    technologies: [{ type: String }],

    link: { type: String, default: "#" },
    github: { type: String, default: "#" },

    featured: { type: Boolean, default: false },

    // ✅ NEW FIELDS (CASE STUDY INFO)
    role: {
      type: String,
      default: "Full Stack Developer",
    },

    duration: {
      type: String,
      default: "2–4 weeks",
    },

    focus: {
      type: String,
      default: "Web Development",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);