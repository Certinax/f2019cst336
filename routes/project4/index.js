var express = require("express");
var router = express.Router();
var oneLinerJoke = require("one-liner-joke");

function getJoke() {
  const joke = oneLinerJoke.getRandomJoke();
  return joke.body;
}

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("project4/index", {
    layout: "/project4/layout",
    title: "CST:336 | Home",
    home: "active", // Sets current page as active (underline) @ navbar
    joke: getJoke()
  });
});

router.get("/get-started", function(req, res, next) {
  res.render("project4/get-started", {
    layout: "/project4/layout",
    title: "CST:336 | Get Started",
    getStarted: "active", // Sets current page as active (underline) @ navbar
    joke: getJoke()
  });
});

router.get("/demo", function(req, res, next) {
  res.render("project4/demo", {
    layout: "/project4/layout",
    title: "CST:336 | Demo",
    demo: "active", // Sets current page as active (underline) @ navbar
    joke: getJoke()
  });
});

router.get("/about", function(req, res, next) {
  res.render("project4/about", {
    layout: "/project4/layout",
    title: "CST:336 | About",
    about: "active", // Sets current page as active (underline) @ navbar
    joke: getJoke()
  });
});

module.exports = router;
