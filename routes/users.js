const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
//const Verify = require("../models/Verify");
const bcrypt = require("bcryptjs");
const templates = require("../config/templates");
const config = require("../config/config");
const Mail = require("../handlers/Mail");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, function (req, res, next) {
  var user = req.user;
  Shop.findOne(
    {
      shopAdmin: user._id,
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log(doc);
      res.render("account_user", {
        title: "Account || " + user.user.lastName,
        user,
        shop: doc,
      });
    }
  );
});
//register
router.get("/register", forwardAuthenticated, function (req, res, next) {
  var user = undefined;
  res.render("signup", {
    title: "Sign-up Page",
    user: user,
  });
});
router.post("/register", (req, res, next) => {
  var data = req.body;
  var url = "/user/login";
  User.findOne(
    {
      phoneNumber: data.phoneNumber,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (user === null) {
          var newUser = new User(data);
          // hash passwords
          bcrypt.genSalt(10, function (err, salt) {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, function (err, hash) {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((newuser) => {
                  req.flash("success_msg", "You have Been Registered successfully");
                  res.redirect(url);
                  login(req, res, next, data, "/", url);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        } else {
          req.flash("error_msg", "You Already Have an Account");
          res.redirect(url);
        }
      }
    }
  );
});

// Login
router.get("/login", forwardAuthenticated, function (req, res, next) {
  var user = undefined;
  res.render("signin", {
    title: "Sign-in Page",
    user: user,
  });
});

router.post("/login", (req, res, next) => {
  login(req, res, next, req.body, "/");
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/user/login");
});

//recover password
router.get("/reset-password/", function (req, res, next) {
  res.render("recover", {
    title: "Reset password Page",
  });
});
router.post("/recover/", function (req, res, next) {
  var mail = req.body;
  var code = 200;
  console.log(mail);
  console.log(code);
  res.sendStatus(code);
});
router.post("/update_password/:id", function (req, res, next) {
  var id = req.params.id;
  var data = req.body;
  var newpass = data.password;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(data.password, salt, function (err, hash) {
      if (err) throw err;
      data.password = hash;
      User.findOneAndUpdate(
        {
          phoneNumber: data.phoneNumber,
        },
        {
          password: data.password,
        },
        (err, doc) => {
          if (err) throw err;
          req.body.phoneNumber = doc.phoneNumber;
          req.body.password = newpass;
          login(req, res, next, req.body, "/user");
        }
      );
    });
  });
});
router.get("/verify_:code", (req, res) => {
  let id = req.user._id;
  let code = req.params.code;
  let date = Date.now();
  let expDate = "";
  if (id) {
    Verify.findOne(
      {
        userId: id,
      },
      (err, doc) => {
        expDate = doc.expDate.getTime();
        if (err) {
          console.log(err);
          res.status(500);
        } else {
          if (code === doc.code) {
            if (date <= expDate) {
              User.findOneAndUpdate(
                {
                  _id: id,
                },
                {
                  verified: true,
                },
                (err, doc) => {
                  req.flash("success_msg", "Verification Completed!");
                  res.redirect("/user");
                }
              );
            } else {
              res.status(200).json({
                msg: "Time has Expired!",
                time: date,
                expiryDate: expDate,
                diff: expDate - date,
              });
            }
          } else {
            res.status(200).json({
              msg: "Verification Code is Not Valid",
            });
          }
        }
      }
    );
  } else {
    Verify.findOne(
      {
        code: code,
      },
      (err, doc) => {
        expDate = doc.expDate.getTime();
        if (err) {
          console.log(err);
        } else {
          if (doc) {
            if (date <= expDate) {
              User.findOne(
                {
                  _id: doc.userId,
                },
                (err, doc) => {
                  if (err) {
                    console.log(err);
                  } else {
                    if (doc) {
                      let data = {
                        phoneNumber: doc.phoneNumber,
                        password: doc.password,
                      };
                      req.flash("success_msg", "Verification Completed!");
                      login(req, res, next, data, "/user");
                    }
                  }
                }
              );
              res.status(200).json({
                msg: "Verified",
              });
            } else {
              res.status(200).json({
                msg: "Time has Expired!",
              });
            }
          } else {
            res.status(200).json({
              msg: "Verification Code is Not Valid",
            });
          }
        }
      }
    );
  }
});
router.post("/verify", ensureAuthenticated, function (req, res, next) {
  var data = req.body;
  var id = req.user._id;
  console.log(data);
  User.findById(id, (err, doc) => {
    if (doc.userMail === undefined) {
      doc.userMail = data.userMail;
      doc
        .save()
        .then((doc) => {
          console.log(doc);
          res.status(200).json({
            msg: "Verified",
            data: doc,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    } else {
      if (doc.verified) {
        res.status(200).json({
          msg: "Verified already",
        });
      } else {
        Verify.findOne(
          {
            userId: id,
          },
          (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              if (doc) {
                var body = {
                  link: url,
                  time: doc.expDate,
                };
                let mailOptions = templates(body).verify;
                Mail(mailOptions, respond, res);
              } else {
                function respond(info) {
                  console.log(info);
                  res.status(200).json({
                    msg: "verification link sent to your email",
                  });
                }
                var date = Date.now();
                var str = randCode(date);
                var str1 = randCode(date + Math.random() * 10000);
                var code = str + str1;
                var url = config.host + "/user/verification_" + code;
                var d = {
                  code: code,
                  userId: id,
                };
                var expDate = date + 21600000;
                d.expDate = new Date(expDate);
                var date = Date.now();
                var newVerification = Verify(d);
                newVerification
                  .save()
                  .then((doc) => {
                    var body = {
                      link: url,
                      time: doc.expDate,
                    };
                    let mailOptions = templates(body).verify;
                    Mail(mailOptions, respond);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }
        );
      }
    }
  });
});
router.post("/update_user", ensureAuthenticated, (req, res) => {
  var user = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
  };
  var id = req.user._id;
  User.findOne(
    {
      _id: id,
    },
    (err, doc) => {
      if (err) throw err;
      doc.user = user;
      doc
        .save()
        .then((doc) => {
          res.status(200).json({
            msg: "User's Details updated",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
        });
    }
  );
});
module.exports = router;

function randCode(date) {
  var max = date * (Math.random() * (1 - 0.1));
  var min = date;
  var lMax = date * (Math.random() * (1 - 0.1) + 1);

  function getRndInteger(min, max, lMax) {
    return (
      Math.floor(Math.random() * (max - min)) +
      Math.ceil(lMax / (Math.random() * (1 - 0.1) + 1))
    );
  }
  return getRndInteger(min, max, lMax).toString(26).toLocaleUpperCase();
}

function login(req, res, next, data, sucessurl) {
  req.body.phoneNumber = data.phoneNumber;
  req.body.password = data.password;
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error_msg", info.message);
      return res.redirect("/user/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "Welcome " + user.user.lastName);
      return res.redirect(sucessurl);
    });
  })(req, res, next);
}
