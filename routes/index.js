var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("hello from sample server");
});

router.get("/favicon.ico", (req, res) => {
  res.sendFile('/assets/icons/favicon.png', (err) => {
    console.log(err);
  })
});
router.get("/oauth/:meth", (req, res) => {
  var method = req.params.meth;
  var query = req.query
  switch (method) {
    case "generate":
      res.json({
        msg: "ok",
        access_token: "",
        expiry: ""
      })
      break;

    default:
      break;
  }
});

module.exports = router;