var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.get("/:q/:image_type", function(req, res, next) {
  console.log(req.params);
  const { q, image_type } = req.params;
  // try {
  //   const response = await fetch(
  //     `${process.env.PIXABAY_API_URL}?key=${process.env.PIXABAY_API_KEY}`
  //   );
  // } catch (err) {
  //   console.log(err);
  // }
  res.send("Got your request, here is your response!");
});

module.exports = router;
