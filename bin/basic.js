var express = require("express");
var app = express();

app.use((req, res, next) => {
  console.log("Did I get here? (1)");
  req.commandName = "hello nothing";
  req.numbers = Array.from({ length: 10 }, () =>
    (Math.random() * 100).toFixed(2)
  );
  next();
});

app.use("/", function(req, res, next) {
  console.log("Did I get here? (2)");
  let numbers = "";
  function listNumber() {
    req.numbers.forEach(number => {
      numbers += number.toString() + "<br/>";
    });
  }
  listNumber();
  res.send(`<p>${numbers}</p>`);
  next();
});

const useless = require("./useless");
app.use("/", useless.nothing);

app.listen(3000);
