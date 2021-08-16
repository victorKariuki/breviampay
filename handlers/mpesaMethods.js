function mpesaApi() {
    var request = require("request");
    var config = require("../config/config");
    const B2B = require("../models/B2B");
    const B2C = require("../models/B2C");
    const Bal = require("../models/Bal");
    const Reverse = require("../models/Reverse");
    const Status = require("../models/Status");
    const StkAccept = require("../models/Stkpush_accepted");
    const StkCancel = require("../models/Stkpush_cancelled");
    const StkQuery = require("../models/Stkpush_query");
    var self = this;
    this.oauth_token;
    this.mpesaResponse = {
        1: "Insufficient Funds",
        2: "Less Than Minimum Transaction Value",
        3: "More Than Maximum Transaction Value",
        4: "Would Exceed Daily Transfer Limit",
        5: "Would Exceed Minimum Balance",
        6: "Unresolved Primary Party",
        7: "Unresolved Receiver Party",
        8: "Would Exceed Maxiumum Balance",
        11: "Debit Account Invalid",
        12: "Credit Account Invaliud",
        13: "Unresolved Debit Account",
        14: "Unresolved Credit Account",
        15: "Duplicate Detected",
        17: "Internal Failure",
        20: "Unresolved Initiator",
        26: "Traffic blocking condition in place",
    };
    this.mpesaErrCode = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable – You requested a format that isn’t json",
        429: "Too Many Requests",
        500: "Internal Server Error – We had a problem with our server. Try again later.",
        503: "Service Unavailable – We’re temporarily offline for maintenance. Please try again later.",
    };
    (this.b2c = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
            auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    InitiatorName: initiatorName,
                    SecurityCredential: config.mpesaApi.securityCredential,
                    CommandID: body.CommandID,
                    Amount: body.Amount,
                    PartyA: body.PartyA,
                    PartyB: config.mpesaApi.shortcode,
                    Remarks: body.Remarks,
                    QueueTimeOutURL: config.host + "/timeout/b2c",
                    ResultURL: config.host + "/result/b2c",
                    Occasion: body.Occasion,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                     var record = new B2C(body);
                     record
                       .save()
                       .then((doc) => {
                         callback(response, body);
                       })
                       .catch((err) => {
                         console.log(err);
                       });
                }
            }
        );
        return request;
    }),
    (this.b2b = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    Initiator: config.mpesaApi.initiator,
                    SecurityCredential: config.mpesaApi.securityCredential,
                    CommandID: body.CommandID,
                    SenderIdentifierType: config.mpesaApi.sender,
                    RecieverIdentifierType: body.RecieverIdentifierType,
                    Amount: body.Amount,
                    PartyA: body.PartyA,
                    PartyB: config.mpesaApi.shortcode,
                    AccountReference: body.AccountReference,
                    Remarks: body.Remarks,
                    QueueTimeOutURL: config.host + "/timeout/b2b",
                    ResultURL: config.host + "/result/b2b",
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                     var record = new B2B(body);
                     record
                       .save()
                       .then((doc) => {
                         callback(response, body);
                       })
                       .catch((err) => {
                         console.log(err);
                       });
                }
            }
        );
        return url;
    }),
    (this.c2bRegisteUrl = function (ResponseType, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    ShortCode: config.mpesaApi.shortcode,
                    ResponseType: ResponseType,
                    ConfirmationURL: config.host + "/confirmation/c2b",
                    ValidationURL: config.host + "/validation/c2b",
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                    callback(response, body);
                }
            }
        );
    }),
    (this.c2bSimulate = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    //Fill in the request parameters with valid values
                    ShortCode: config.mpesaApi.shortcode,
                    CommandID: body.CommandID,
                    Amount: body.Amount,
                    Msisdn: body.Msisdn,
                    BillRefNumber: body.BillRefNumber,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                    callback(response, body);
                }
            }
        );
    }),
    (this.accountBalance = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    Initiator: config.mpesaApi.initiator,
                    SecurityCredential: config.mpesaApi.securityCredential,
                    CommandID: "AccountBalance",
                    PartyA: body.PartyA,
                    IdentifierType: "4",
                    Remarks: body.Remarks,
                    QueueTimeOutURL: config.host + "/result/acB",
                    ResultURL: config.host + "/timeout/acB",
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                    var record = new Bal(body);
                    record
                      .save()
                      .then((doc) => {
                        callback(response, body);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }
            }
        );
    }),
    (this.transactionStatus = function (body, callback) {
        var url =
            "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    Initiator: config.mpesaApi.initiator,
                    SecurityCredential: config.mpesaApi.securityCredential,
                    CommandID: "TransactionStatusQuery",
                    TransactionID: body.TransactionID,
                    PartyA: body.PartyA,
                    IdentifierType: "1",
                    ResultURL: config.host + "/result/status",
                    QueueTimeOutURL: config.host + "/timeout/status",
                    Remarks: body.Remarks,
                    Occasion: body.Occasion,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                    var record = new Status(body);
                    record
                      .save()
                      .then((doc) => {
                        callback(response, body);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }
            }
        );
    }),
    (this.reversal = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request",
            auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    Initiator: config.mpesaApi.initiator,
                    SecurityCredential: config.mpesaApi.securityCredential,
                    CommandID: "TransactionReversal",
                    TransactionID: body.TransactionID,
                    Amount: body.Amount,
                    ReceiverParty: body.ReceiverParty,
                    RecieverIdentifierType: "4",
                    ResultURL: config.host + "/result/reverse",
                    QueueTimeOutURL: config.host + "/timeout/reverse",
                    Remarks: body.Remarks,
                    Occasion: body.Occasion,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                    var record = new Reverse(body);
                    record
                      .save()
                      .then((doc) => {
                        callback(response, body);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }
            }
        );
    }),
    (this.stkpush = function (body, callback) {
        var url =
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    BusinessShortCode: config.mpesaApi.shortcode,
                    Password: config.mpesaApi.pass,
                    Timestamp: config.mpesaApi.timestamp(),
                    TransactionType: "CustomerPayBillOnline",
                    Amount: body.Amount,
                    PartyA: body.PartyA,
                    PartyB: config.mpesaApi.shortcode,
                    PhoneNumber: body.PhoneNumber,
                    CallBackURL: config.host + "/callback",
                    AccountReference: body.AccountReference,
                    TransactionDesc: body.TransactionDesc
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);

                } else {
                    if (body.ResultCode == 0) {
                        var record = new StkAccept(body);
                        record
                          .save()
                          .then((doc) => {
                            callback(response, body);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                    } else {
                        var record = new StkCancel(body);
                        record
                          .save()
                          .then((doc) => {
                            callback(response, body);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                    }
                }
            }
        );
    }),
    (this.stkpushQuery = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    BusinessShortCode: config.mpesaApi.shortcode,
                    Password: config.mpesaApi.pass,
                    Timestamp: config.mpesaApi.timestamp(),
                    CheckoutRequestID: body.CheckoutRequestID,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                    callback(false);
                } else {
                    var record = new StkQuery(body);
                    record.save().then(doc => {
                        callback(response, body);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        );
    }),
    (this.auth = function (consumer_key, consumer_secret, obj) {
        var url =
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            buffer = new Buffer.from(consumer_key + ":" + consumer_secret).toString(
                "base64"
            ),
            auth = "Basic " + buffer;
        request({
                url: url,
                headers: {
                    Authorization: auth,
                },
            },
            function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    setTimeout(() => {
                        self.oauth_token = body.access_token;
                    }, (parseInt(body.expiry_date) + 1) * 1000);
                    self.oauth_token = body.access_token;
                    
                }
            }
        );
        return obj;
    }),
    this.getToken = function (consumer_key, consumer_secret) {
        self.auth(consumer_key, consumer_secret);
    };
    this.init = function () {
        self.getToken(
            config.mpesaApi.consumer.key,
            config.mpesaApi.consumer.secret
        );
    };

}
module.exports = mpesaApi;