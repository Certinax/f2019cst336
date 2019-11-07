const express = require("express");
const router = express.Router();
const mysql = require("mysql");

router.get("/", function(req, res, next) {
  const connection = mysql.createConnection({
    host: "gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "ja917ja2oz8oxfse",
    password: "tmen85k0qhf0nf42",
    database: "ttz6ecwcw6gso97e"
  });

  connection.connect();

  connection.query("SELECT 1 + 1 AS solution", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);

    res.render("../public/mysql/view", {
      title: "MySQL example",
      answer: results[0].solution
    });
  });

  connection.end();
});

router.get("/quotes", function(req, res, next) {
  const connection = mysql.createConnection({
    host: "gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "ja917ja2oz8oxfse",
    password: "tmen85k0qhf0nf42",
    database: "ttz6ecwcw6gso97e"
  });

  connection.connect();

  connection.query("SELECT * FROM ex_mysql_quote", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log("The solution is: ", results);

    res.render("../public/mysql/answer", {
      title: "MySQL example",
      quotes: results
    });
  });

  connection.end();
});
module.exports = router;
