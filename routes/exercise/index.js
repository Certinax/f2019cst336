var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("exercises/promises", {
    title: "Exercise - promises",
    message: "Exercising promises"
  });
  //res.send("This is from exercises/index");
});

module.exports = router;
