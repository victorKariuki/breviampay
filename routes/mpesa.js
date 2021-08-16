var express = require("express");
var router = express.Router();
const C2BConf = require("../models/C2B_confirmation");
const C2BValid = require("../models/C2B_validation");
// ValidationURL || ConfirmationURL || CallbackUrl
// QueueTimeoutURL || ResultURL
router.post("/:base/:id", function (req, res) {
  var id = req.params.id;
  var base = req.params.base;
  switch (base) {
    // C2B ValidationURL - /api/v1/c2b/validation
    case "validation":
      var message = {
        ResultCode: 0,
        ResultDesc: "Success",
        ThirdPartyTransID: "1234567890",
      };
      logmessage(req, res, "C2B", message);
      break;
      // C2B ConfirmationURL - /api/v1/c2b/confirmation
    case "confirmation":
      var message = {
        ResultCode: 0,
        ResultDesc: "Success",
      };
      logmessage(req, res, "C2B", message);
      break;
      // Callback  - /api/v1/callback
    case "callback":
      logmessage(req, res, "STK PUSH");
      break;
      // Timeout
    case "timeout":
      switch (id) {
        // B2C QueueTimeoutURL - /api/v1/b2c/timeout
        case "b2c":
          logmessage(req, res, "B2C");
          break;
          // B2B QueueTimeoutURL - /api/v1/b2b/timeout
        case "b2b":
          logmessage(req, res, "B2B");
          break;
          // accountBalance QueueTimeoutURL - /api/v1/accountBalance/timeout
        case "acB":
          logmessage(req, res, "A/C BALANCE");
          break;
          // reverse QueueTimeoutURL - /api/v1/reverse/timeout
        case "reverse":
          logmessage(req, res, "REVERSE");
          break;
          // status QueueTimeoutURL - /api/v1/status/timeout
        case "status":
          logmessage(req, res, "STATUS");
          break;
        default:
          res.status(406).json({
            msg: " Not Acceptable"
          });
          break;
      }
      break;
      //Results
    case "result":
      switch (id) {
        // B2C QueueTimeoutURL - /api/v1/b2c/timeout
        case "b2c":
          logmessage(req, res, "B2C");
          break;
          // B2B QueueTimeoutURL - /api/v1/b2b/timeout
        case "b2b":
          logmessage(req, res, "B2B");
          break;
          // accountBalance QueueTimeoutURL - /api/v1/accountBalance/timeout
        case "acB":
          logmessage(req, res, "A/C BALANCE");
          break;
          // reverse QueueTimeoutURL - /api/v1/reverse/timeout
        case "reverse":
          logmessage(req, res, "REVERSE");
          break;
          // status QueueTimeoutURL - /api/v1/status/timeout
        case "status":
          logmessage(req, res, "STATUS");
          break;
        default:
          res.status(406).json({
            msg: " Not Acceptable"
          });
          break;
      }
      break;
    default:
      res.status(406).json({
        msg: " Not Acceptable"
      });
      break
  }
});
module.exports = router;

function logmessage(req, res, title, message = {
  ResponseCode: "00000000",
  ResponseDesc: "success",
}) {
  var base = req.params.base.toUpperCase();
  console.log(`-----------${title} ${base}------------`);
  console.log(req.body);
  console.log("-----------------------");

  res.json(message);
}