var express = require("express");
var router = express.Router();
var prettyjson = require("prettyjson");
var options = {
  noColor: true,
};

// C2B ValidationURL - /api/v1/c2b/validation
router.post("/validation", function (req, res) {
    console.log("-----------C2B VALIDATION REQUEST-----------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResultCode: 0,
        ResultDesc: "Success",
        ThirdPartyTransID: "1234567890",
    };

    res.json(message);
});

// C2B ConfirmationURL - /api/v1/c2b/confirmation
router.post("/confirmation", function (req, res) {
    console.log("-----------C2B CONFIRMATION REQUEST------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResultCode: 0,
        ResultDesc: "Success",
    };

    res.json(message);
});

// Callback  - /api/v1/callback
router.post("/callback", function (req, res) {
    console.log("-----------Callback------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});


module.exports = router;
