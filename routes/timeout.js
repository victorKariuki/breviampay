var express = require("express");
var router = express.Router();
var prettyjson = require("prettyjson");
var options = {
  noColor: true,
};

// B2C QueueTimeoutURL - /api/v1/b2c/timeout
router.post("/b2c", function (req, res) {
    console.log("-----------B2C TIMEOUT------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});
// B2B QueueTimeoutURL - /api/v1/b2b/timeout
router.post("/b2b", function (req, res) {
    console.log("-----------B2B TIMEOUT------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});
// accountBalance QueueTimeoutURL - /api/v1/accountBalance/timeout
router.post("/acB", function (req, res) {
    console.log("-----------accountBalance TIMEOUT------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});
// reverse QueueTimeoutURL - /api/v1/reverse/timeout
router.post("/reverse", function (req, res) {
    console.log("-----------reverse TIMEOUT------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});
// status QueueTimeoutURL - /api/v1/status/timeout
router.post("/status", function (req, res) {
    console.log("-----------status TIMEOUT------------");
    console.log(prettyjson.render(req.body, options));
    console.log("-----------------------");

    var message = {
        ResponseCode: "00000000",
        ResponseDesc: "success",
    };

    res.json(message);
});

module.exports = router;