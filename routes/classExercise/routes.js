var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("classExercise/routes", {
    title: "Routing",
    message: "Exercising routing with hbs"
  });
});

router.post("/:routeNumber", function(req, res, next) {
  res.render("classExercise/routes", {
    title: "Routing - POST request",
    message: `This is your routenumber: ` + req.params.routeNumber
  });
});

router.post("/", function(req, res, next) {
  let rnmb = "none";
  console.log(req.query);
  if (req.query.routeNumber) {
    rnmb = req.query.routeNumber;
  }
  res.render("classExercise/routes", {
    title: "Routing - POST request",
    message: `This is your routenumber: ${rnmb}`
  });
});

module.exports = router;
