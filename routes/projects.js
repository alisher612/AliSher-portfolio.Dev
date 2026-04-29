// // const express = require("express");
// // const router = express.Router();
// // const projectController = require("../controllers/projectController");

// // router.get("/", projectController.getProjects);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const projectController = require("../controllers/projectController");

// // All projects
// router.get("/", projectController.getProjects);

// // Single project
// router.get("/:id", projectController.getSingleProject);

// module.exports = router;
/////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const router = express.Router();

// const projectController = require("../controllers/projectController");

// // -------------------- ALL PROJECTS PAGE --------------------
// router.get("/", projectController.getProjects);

// // -------------------- SINGLE PROJECT PAGE --------------------
// router.get("/:id", projectController.getSingleProject);

// module.exports = router;

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// All projects
router.get("/", projectController.getProjects);

// Single project
router.get("/:id", projectController.getSingleProject);

module.exports = router;