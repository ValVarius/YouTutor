const db = require("../models");

const express = require("express");

const router = express.Router();

router.get("/Signup", function (req, res) {
  res.send("Welcome to the YouTutor API");
});

router.post("/userSignup", function (req, res) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", req.body);

  db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    picture: req.body.picture,
  })
    .then((newUser) => {
      req.session.user = newUser;

      res.send(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/userSignup");
    });
});

module.exports = router;
