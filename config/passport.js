const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
        usernameField: "phoneNumber"
      },
      (phoneNumber, password, done) => {
        // Match user
        User.findOne({
          phoneNumber: phoneNumber,
        }).then((user) => {
          if (!user) {
            return done(null, false, {
              message: "User Doesn't exist"
            });
          }

          // Match password
          if (password == user.password) {
            return done(null, user);
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect Password"
              });
            }
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};