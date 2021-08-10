const express = require("express");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");

var app = express();

// compress all responses
app.use(compression());
//passport
require('./config/passport')(passport);

//use sessions for tracking logins
app.use(
    session({
        secret: "work hard",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: "mongoUrl: " + require("./config/config").dbURI,
            dbName: require("./config/config").dbName,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        msg: res.locals.message
    });
});

console.log("Server listening on port: 8310");
app.listen(8310);