var request = require("request");
module.exports = mpesaApi;

function mpesaApi(consumer_key, consumer_secret) {
    var self = this;
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
                    InitiatorName: body.InitiatorName,
                    SecurityCredential: SecurityCredential,
                    CommandID: body.CommandID,
                    Amount: body.Amount,
                    PartyA: body.PartyA,
                    PartyB: body.PartyB,
                    Remarks: body.Remarks,
                    QueueTimeOutURL: body.host + "/timeout/b2c",
                    ResultURL: body.host + "/result/b2c",
                    Occasion: body.Occasion,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body)
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
                    Initiator: body.Initiator,
                    SecurityCredential: SecurityCredential,
                    CommandID: body.CommandID,
                    SenderIdentifierType: body.SenderIdentifierType,
                    RecieverIdentifierType: body.RecieverIdentifierType,
                    Amount: body.Amount,
                    PartyA: body.PartyA,
                    PartyB: body.PartyB,
                    AccountReference: body.AccountReference,
                    Remarks: body.Remarks,
                    QueueTimeOutURL: body.host + "/timeout/b2b",
                    ResultURL: body.host + "/result/b2b",
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body);
                }
            }
        );
        return url;
    }),
    (this.c2b = function (body, callback) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    ShortCode: body.ShortCode,
                    ResponseType: body.ResponseType,
                    ConfirmationURL: body.host + "/confirmation",
                    ValidationURL: body.host + "/validation",
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the
                if (error) {
                    console.log(error);
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
                    ShortCode: body.ShortCode,
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
                } else {
                    callback(response, body);
                }
            }
        );
    }),
    (this.accountBalance = function (body, callback) {
        var url =
            "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query";
        auth = "Bearer " + self.oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    Authorization: auth,
                },
                json: {
                    Initiator: body.Initiator,
                    SecurityCredential: body.SecurityCredential,
                    CommandID: "AccountBalance",
                    PartyA: body.PartyA,
                    IdentifierType: "4",
                    Remarks: body.Remarks,
                    QueueTimeOutURL: body.host + "/result/acB",
                    ResultURL: body.host + "/timeout/acB",
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body);
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
                    Initiator: body.Initiator,
                    SecurityCredential: body.SecurityCredential,
                    CommandID: "TransactionStatusQuery",
                    TransactionID: body.TransactionID,
                    PartyA: body.PartyA,
                    IdentifierType: "1",
                    ResultURL: body.host + "/result/status",
                    QueueTimeOutURL: body.host + "/timeout/status",
                    Remarks: body.Remarks,
                    Occasion: body.Occasion,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body);
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
                    Initiator: body.Initiator,
                    SecurityCredential: body.SecurityCredential,
                    CommandID: "TransactionReversal",
                    TransactionID: body.TransactionID,
                    Amount: body.Amount,
                    ReceiverParty: body.ReceiverParty,
                    RecieverIdentifierType: "4",
                    ResultURL: body.host + "/result/reverse",
                    QueueTimeOutURL: body.host + "/timeout/reverse",
                    Remarks: body.Remarks,
                    Occasion: body.Occasion,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body);
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
                    BusinessShortCode: body.BusinessShortCode,
                    Password: body.Password,
                    Timestamp: body.Timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: body.Amount,
                    PartyA: body.PartyA,
                    PartyB: body.PartyB,
                    PhoneNumber: body.PhoneNumber,
                    CallBackURL: body.host + "/callback",
                    AccountReference: body.AccountReference,
                    TransactionDesc: body.TransactionDesc,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body);
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
                    BusinessShortCode: body.BusinessShortCode,
                    Password: body.Password,
                    Timestamp: body.Timestamp,
                    CheckoutRequestID: body.CheckoutRequestID,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                if (error) {
                    console.log(error);
                } else {
                    callback(response, body);
                }
            }
        );
    }),
    (this.auth = function (consumer_key, consumer_secret, obj) {
        var url =
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            buffer = new Buffer.from(
                consumer_key + ":" + consumer_secret
            ).toString("base64"),
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
    this.oauth_token;
    function getToken(consumer_key, consumer_secret) {
        self.auth(consumer_key, consumer_secret);
    };
    getToken(consumer_key, consumer_secret);
}