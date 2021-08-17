var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mpesaRouter = require("./routes/mpesa");
var apiRouter = require("./routes/api");

var app = express();
// compress all responses
app.use(compression());
//passport
/* require("./config/passport")(passport); */

//use sessions for tracking logins
/* app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongoUrl: " + require("./config/config").dbURI,
      dbName: require("./config/config").dbName,
    }),
  })
); */

/* app.use(passport.initialize());
app.use(passport.session()); */
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/api", apiRouter);
app.use("/sampe", mpesaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
