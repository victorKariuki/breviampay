var express = require("express");
var router = express.Router();
var fs = require("fs");
var mpesaApi = require("../handlers/mpesaMethods");
var Mail = require("../handlers/Mail");
const User = require("../models/User");
const Incoming = require("../models/IncominingTrans");
const Outgoing = require("../models/OutgoingTrans");
var {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth");

let Mpesa = new mpesaApi();
Mpesa.init();
router.get("/queryMethods", (req, res) => {
  getItemsFile("./config/config.json", (resp) => {
    if (resp) {
      res.status(200).json({
        msg: "Ok",
        data: resp,
      });
    } else {
      res.status(500).json({
        msg: "Server error",
      });
    }
  });
});
router.post("/recievePaymentRequest/:paymentId", (req, res) => {
  let data = req.body;
  if (req.params.paymentId == "mpesa") {
    var obj = {
      Amount: data.Amount,
      PartyA: data.PhoneNumber,
      PhoneNumber: data.PhoneNumber,
      AccountReference: data.AccountReference,
      TransactionDesc: data.TransactionDesc,
    };
    console.log(obj);
    sendPaymentRequest(obj, res);
  }
});
router.post("/sendPaymentsRequest/:paymentId/:procId", (req, res) => {
  let data = req.body;
  if (req.params.paymentId == "mpesa") {
    if (req.params.procId == "b2c") {
      Mpesa.b2c(data.data, (resp, body) => {
        if (resp) {
          console.log(resp);
          if (body) {
            console.log(body);
            res.status(200).json({
              msg: "ok",
              data: body,
            });
          } else {
            res.status(403).json({
              msg: Mpesa.mpesaErrCode[403],
            });
          }
        } else {
          res.status(500).json({
            msg: Mpesa.mpesaErrCode[500],
          });
        }
      });
    } else if ("b2b") {
      Mpesa.b2b(data.data, (resp, body) => {
        if (resp) {
          console.log(resp);
          if (body) {
            console.log(body);
            res.status(200).json({
              msg: "ok",
              data: body,
            });
          } else {
            res.status(403).json({
              msg: Mpesa.mpesaErrCode[403],
            });
          }
        } else {
          res.status(500).json({
            msg: Mpesa.mpesaErrCode[500],
          });
        }
      });
    }
  }
});
router.post("/reversePaymentRequest/:paymentId", (req, res) => {
  let body = req.body;
  let obj = {
    TransactionID: body.TransactionID,
    Amount: body.Amount,
    ReceiverParty: body.ReceiverParty,
    Remarks: body.Remarks,
    Occasion: body.Occasion,
  };
  Mpesa.reversal(obj, (resp, body) => {
    if (resp) {
      console.log(resp);
      if (body) {
        console.log(body);
        res.status(200).json({
          msg: "ok",
          data: body,
        });
      } else {
        res.status(403).json({
          msg: Mpesa.mpesaErrCode[403],
        });
      }
    } else {
      res.status(500).json({
        msg: Mpesa.mpesaErrCode[500],
      });
    }
  });
});

module.exports = router;

function sendPaymentRequest(obj, res) {
  Mpesa.stkpush(obj, (resp, body) => {
    if (resp) {
      if (body) {
        if (body.hasProperty("errorCode")) {
          if (body.errorCode == "404.001.03") {
            sendPaymentRequest(obj, res);
          }
        }
        console.log(body);
        res.status(200).json({
          msg: "ok",
          data: body,
        });
      } else {
        res.status(403).json({
          msg: Mpesa.mpesaErrCode[403],
        });
      }
    } else {
      res.status(500).json({
        msg: Mpesa.mpesaErrCode[500],
      });
    }
  });
}

function getItemsFile(file, callback) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    callback(JSON.parse(data));
  });
}