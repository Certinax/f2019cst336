var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
const session = require("express-session");

// Register partials for hbs
hbs.registerPartials(__dirname + "/views/partials");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var routesRouter = require("./routes/classExercise/routes");
var exerciseRouter = require("./routes/exercise/index");
var project4Router = require("./routes/project4/index");
var mysqlRouter = require("./public/mysql/router");
var authRouter = require("./public/auth/index");

var app = express();

// Enable session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

// view engine setup, this is used for the .render() functions.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// This is middleware that gets applied to every request (both the request and response)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/routes", routesRouter);
app.use("/exercises", exerciseRouter);
app.use("/project4", project4Router);
app.use("/mysql", mysqlRouter);
app.use("/auth", authRouter);

// app.get("/pixabay/api/", function(req, res, next) {
//   res.send("Hello");
// });
app.use("/pixabay/api", require("./routes/pixabay"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
