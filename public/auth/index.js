const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const session = require("express-session");

router.get("/dashboard", function(req, res, next) {
  console.log("session: ", req.session);

  // res.render("../public/auth/dashboard", {
  //   title: "Logged in Dashboard"
  // });

  if (req.session && req.session.username && req.session.username.length) {
    res.render("../public/auth/dashboard", {
      title: "Logged in Dashboard",
      username: req.session.username
    });
  } else {
    delete req.session.username;
    res.redirect("/auth/login");
  }
  //res.redirect("/auth/login");
});

router.get("/login", function(req, res, next) {
  res.render("../public/auth/login", {
    title: "Login"
  });
});

router.post("/login", function(req, res, next) {
  // Do something to login
  let successful = false;
  let message = "";
  if (req.body.username === "hello" && req.body.password === "world") {
    successful = true;
    req.session.username = req.body.username;
  } else {
    // Delete the user as punishment
    delete req.session.username;
    message = "Wrong username or password";
  }

  // console.log("session username: ", req.session.username);

  res.json({
    successful: successful,
    message: message
  });
});

router.get("/logout", function(req, res, next) {
  if (req.session && req.session.username && req.session.username.length) {
    delete req.session.username;
  }
  let successful = true;
  res.json({
    logout: successful
  });
});

module.exports = router;
