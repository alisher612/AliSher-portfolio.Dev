// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const session = require("express-session");
// const flash = require("connect-flash");
// const methodOverride = require("method-override");
// const Project = require("./models/project");

// const app = express();

// // -------------------- DATABASE --------------------
// mongoose.connect("mongodb://127.0.0.1:27017/portfolio-cms")
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));


// const ejsMate = require("ejs-mate");
// app.engine("ejs", ejsMate);

// // -------------------- MIDDLEWARE --------------------
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(methodOverride("_method"));

// // -------------------- SESSION --------------------
// app.use(session({
//   secret: "supersecretkey",
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(flash());

// // -------------------- GLOBAL FLASH --------------------
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

// // -------------------- ROUTES --------------------
// // app.get("/", (req, res) => {
// //   res.render("public/home");
// // });

// app.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find().limit(3); // show 3 projects on homepage
    
//     res.render("public/home", { projects });
//   } catch (err) {
//     console.log(err);
//     res.render("public/home", { projects: [] }); // fallback
//   }
// });

// // -------------------- SERVER --------------------
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });


// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const session = require("express-session");
// const flash = require("connect-flash");
// const methodOverride = require("method-override");
// const adminRoutes = require("./routes/admin");
// const DeliveredProject = require("./models/deliveredProject");

// const ejsMate = require("ejs-mate");

// // Routes
// const projectRoutes = require("./routes/projects");

// const app = express();

// // -------------------- DATABASE --------------------
// mongoose
//   .connect("mongodb://127.0.0.1:27017/portfolio-cms")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // -------------------- VIEW ENGINE --------------------
// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // -------------------- MIDDLEWARE --------------------
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(methodOverride("_method"));

// // -------------------- SESSION --------------------
// app.use(
//   session({
//     secret: "supersecretkey",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(flash());

// // -------------------- GLOBAL FLASH --------------------
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

// // -------------------- HOME ROUTE --------------------
// const Project = require("./models/project");

// // app.get("/", async (req, res) => {
// //   try {
// //     // featured projects for homepage
// //     const projects = await Project.find({ featured: true }).limit(3);

// //     res.render("public/home", { projects });
// //   } catch (err) {
// //     console.log(err);
// //     res.render("public/home", { projects: [] });
// //   }
// // });

// app.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find({});
//     const deliveredProjects = await DeliveredProject.find({});

//     res.render("public/home", {
//       projects,
//       deliveredProjects
//     });

//   } catch (err) {
//     console.log(err);

//     res.render("public/home", {
//       projects: [],
//       deliveredProjects: []
//     });
//   }
// });

// // -------------------- ROUTES --------------------
// app.use("/projects", projectRoutes);
// app.use("/", adminRoutes);

// // -------------------- SERVER --------------------
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

// Routes
const adminRoutes = require("./routes/admin");
const projectRoutes = require("./routes/projects");
const messageRoutes = require("./routes/messageRoutes");

// Models
const Project = require("./models/project");
const DeliveredProject = require("./models/deliveredProject");

const app = express();

// -------------------- DATABASE --------------------
// mongoose
//   .connect("mongodb://127.0.0.1:27017/portfolio-cms")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// -------------------- DATABASE --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// -------------------- VIEW ENGINE --------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------- MIDDLEWARE --------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// -------------------- SESSION --------------------
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

// -------------------- GLOBAL FLASH --------------------
app.use((req, res, next) => {
  res.locals.success = req.flash("success")[0];
  res.locals.error = req.flash("error")[0];
  next();
});

// -------------------- HOME ROUTE --------------------
app.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    const deliveredProjects = await DeliveredProject.find({});

    res.render("public/home", {
      projects,
      deliveredProjects,
    });
  } catch (err) {
    console.log(err);

    res.render("public/home", {
      projects: [],
      deliveredProjects: [],
    });
  }
});

// -------------------- ROUTES --------------------
app.use("/projects", projectRoutes);
app.use("/", adminRoutes);

// ✅ CONTACT ROUTES (THIS FIXES YOUR ERROR)
app.use("/", messageRoutes);

// -------------------- SERVER --------------------
app.listen(3000, () => {
  console.log("Server running on port 3000");
});