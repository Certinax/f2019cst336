var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { layout: "/project4/layout", message: "Test" });
});

module.exports = router;
