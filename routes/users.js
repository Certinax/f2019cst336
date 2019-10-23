var express = require("express");
var router = express.Router();

/* GET users listing. (/users/98121) */
router.get("/:id", function(req, res, next) {
  console.log("user id", req.params.id);
  res.status(200).json({
    id: req.params.id,
    name: req.query.name
  });
});

/* GET users listing. (/users/) */
router.get("/", function(req, res, next) {
  res.send("respond with all users");
  //res.render("details/users", )
});

/* POST users listing. */
router.post("/", function(req, res, next) {
  res.send("post and respond with statuts");
});

/* DELETE users listing. */
router.delete("/", function(req, res, next) {
  res.send("delete and respond with status");
});

/* HEAD users listing. */
router.head("/", function(req, res, next) {
  res.send("head and respons with status");
});
module.exports = router;
