var express = require("express");
var router = express.Router();
var fs = require("fs");
var mpesaApi = require("../handlers/mpesaMethods");
const User = require("../models/User");
var {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth");

let Mpesa = new mpesaApi();

router.get("/queryMethods", (req, res) => {
  getItemsFile("./config/config.json", (resp) => {
    if (resp) {
      //console.log(resp);
      res.status(200).json({
        msg: "Ok",
        data: resp,
      });
    } else {
      res.status(500).json({
        msg: "Server error"
      });
    }
  });
});
router.post("/recievePaymentRequest/:paymentId", (req, res) => {
  let data = req.body;
  if (req.params.paymentId == "mpesa") {
    var obj = {
      Amount: data.amount,
      PartyA: data.phoneNumber,
      PhoneNumber: data.phoneNumber,
      AccountReference: data.ref,
      TransactionDesc: data.description,
    };
    Mpesa.stkpush(obj, (resp, body) => {
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
});
router.post("/sendPaymentsRequest/:paymentId", (req, res) => {
  let data = req.body;
  var obj;
  if (req.params.paymentId == "mpesa") {
    let b2b = data.filter((element) => {
      return element.instance == "b2b"
    });
    let b2c = data.filter((element) => {
      return element.instance == "b2b";
    });
    b2b.forEach(element => {
      obj = {
        CommandID: body.CommandID,
        RecieverIdentifierType: body.RecieverIdentifierType,
        Amount: body.Amount,
        PartyA: body.PartyA,
        AccountReference: body.AccountReference,
        Remarks: body.Remarks,
      };
      Mpesa.b2c(obj, (resp, body) => {
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
    b2c.forEach((element) => {
      obj = {
        CommandID: body.CommandID,
        Remarks: body.Remarks,
        Occasion: body.Occasion,
        Amount: element.amount,
        PartyA: element.phoneNumber
      };
      Mpesa.b2b(obj, (resp, body) => {
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

function getItemsFile(file, callback) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) throw err;
    //console.log(data);
    callback(JSON.parse(data));
  });
}