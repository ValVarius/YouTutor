const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");
const path = require("path");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const origins = [
  "http://localhost:3000", // Development
  "http://you-tutor.herokuapp.com", // Just for debugging reasons
  "https://you-tutor.herokuapp.com",
  "http://www.you-tutor.com",
  "https://www.you-tutor.com",
];

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: db.sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

app.use(express.static("public"));

const logInRoute = require("./controllers/loginController.js");
const studentRoute = require("./controllers/studentController.js");
const reviewRoute = require("./controllers/reviewController.js");
const signupRoute = require("./controllers/signupController.js");
const teacherRoute = require("./controllers/teacherController.js");
const filterRoute = require("./controllers/filterController.js");
const matchingRoute = require("./controllers/matchingController.js");


app.use(logInRoute);
app.use(studentRoute);
app.use(reviewRoute);
app.use(signupRoute);
app.use(teacherRoute);
app.use(filterRoute);
app.use(matchingRoute);

db.sequelize
  .sync({
    force: false,
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  })
  .catch((err) => {
    throw err;
  });

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "client/build")));
  // app.use(express.static("client/build"));

  // Anything that doesn't match the above, send back index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

/////////////////////////Storing Pictures

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {

  if (req.file)
    res.json({
      imageUrl: `images/uploads/${req.file.filename}`,
    });
  else res.status("409").json("No Files to Upload.");
});

