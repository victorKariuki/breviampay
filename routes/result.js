var express = require("express");
var router = express.Router();
var prettyjson = require("prettyjson");
var options = {
  noColor: true,
};
// B2C ResultURL - /api/v1/b2c/result
router.post("/b2c", function (req, res) {
    console.log("-----------B2C CALLBACK------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});
// B2B ResultURL - /api/v1/b2b/result
router.post("/b2b", function (req, res) {
    console.log("-----------B2B CALLBACK------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});

// accountBalance ResultURL - /api/v1/accountBalance/result
router.post("/acB", function (req, res) {
    console.log("-----------accountBalance CALLBACK------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});

// reverse ResultURL - /api/v1/reverse/result
router.post("/reverse", function (req, res) {
    console.log("-----------reverse CALLBACK------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});
// status ResultURL - /api/v1/status/result
router.post("/status", function (req, res) {
    console.log("-----------status CALLBACK------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});

module.exports = router;
