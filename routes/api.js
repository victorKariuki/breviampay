var express = require("express");
var router = express.Router();
var mpesaApi = require("../handlers/mpesaMethods");
var config = require("../config/config");
var consumer = config.consumer;
let Mpesa = new mpesaApi(consumer.key, consumer.secret);
var shortcode = config.shortcode;

router.get("/", (req, res) => {
  res.send("hello from simple server :)");
});
router.post("/collect/:id/payment", (req, res) => {
  let data = req.body;
  var obj = {}
  Mpesa.stkpush(obj, (res, body) => {
    console.log(res);
    console.log(body);
  })
});

module.exports = router;