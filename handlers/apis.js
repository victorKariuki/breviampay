var request = require('request');
module.exports = {
    b2c: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
            auth = "Bearer " + oauth_token;
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
                console.log(body);
            }
        );
        return request;
    },
    b2b: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest";
        auth = "Bearer " + oauth_token;
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
                console.log(body);
            }
        );
        return url;
    },
    c2b: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
        auth = "Bearer " + oauth_token;
        request({
                method: 'POST',
                url: url,
                headers: {
                    "Authorization": auth
                },
                json: {
                    "ShortCode": body.ShortCode,
                    "ResponseType": body.ResponseType,
                    "ConfirmationURL": body.host + "/confirmation",
                    "ValidationURL": body.host + "/validation"
                }
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the 
                console.log(body)
            }
        )
    },
    c2bSimulate: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
        auth = "Bearer " + oauth_token;
        request({
                method: 'POST',
                url: url,
                headers: {
                    "Authorization": auth
                },
                json: {
                    //Fill in the request parameters with valid values
                    "ShortCode": body.ShortCode,
                    "CommandID": body.CommandID,
                    "Amount": body.Amount,
                    "Msisdn": body.Msisdn,
                    "BillRefNumber": body.BillRefNumber
                }
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                console.log(body)
            }
        )
    },
    accountBalance: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"
        auth = "Bearer " + oauth_token;
        request(
          {
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
            console.log(body);
          }
        );
    },
    transactionStatus: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query"
        auth = "Bearer " + oauth_token;
        request({
                method: 'POST',
                url: url,
                headers: {
                    "Authorization": auth
                },
                json: {
                    "Initiator": body.Initiator,
                    "SecurityCredential": body.SecurityCredential,
                    "CommandID": "TransactionStatusQuery",
                    "TransactionID": body.TransactionID,
                    "PartyA": body.PartyA,
                    "IdentifierType": "1",
                    "ResultURL": body.host + "/result/status",
                    "QueueTimeOutURL": body.host + "/timeout/status",
                    "Remarks": body.Remarks,
                    "Occasion": body.Occasion
                }
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                console.log(body)
            }
        )
    },
    reversal: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request",
            auth = "Bearer " + oauth_token;
        request({
                method: 'POST',
                url: url,
                headers: {
                    "Authorization": auth
                },
                json: {
                    "Initiator": body.Initiator,
                    "SecurityCredential": body.SecurityCredential,
                    "CommandID": "TransactionReversal",
                    "TransactionID": body.TransactionID,
                    "Amount": body.Amount,
                    "ReceiverParty": body.ReceiverParty,
                    "RecieverIdentifierType": "4",
                    "ResultURL": body.host + "/result/reverse",
                    "QueueTimeOutURL": body.host + "/timeout/reverse",
                    "Remarks": body.Remarks,
                    "Occasion": body.Occasion
                }
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                console.log(body)
            }
        )
    },
    stkpush: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            auth = "Bearer " + oauth_token;
        request({
                method: "POST",
                url: url,
                headers: {
                    "Authorization": auth,
                },
                json: {
                    "BusinessShortCode": body.BusinessShortCode,
                    "Password": body.Password,
                    "Timestamp": body.Timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": body.Amount,
                    "PartyA": body.PartyA,
                    "PartyB": body.PartyB,
                    "PhoneNumber": body.PhoneNumber,
                    "CallBackURL": body.host + "/callback",
                    "AccountReference": body.AccountReference,
                    "TransactionDesc": body.TransactionDesc
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                console.log(body);
            }
        );
    },
    stkpushQuery: function (oauth_token, body) {
        var url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        auth = "Bearer " + oauth_token;
        request({
                method: 'POST',
                url: url,
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": body.BusinessShortCode,
                    "Password": body.Password,
                    "Timestamp": body.Timestamp,
                    "CheckoutRequestID": body.CheckoutRequestID
                }
            },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                console.log(body)
            }
        )
    },
    auth: function (consumer_key, consumer_secret) {
        var url =
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            buffer = new Buffer(consumer_key + ":" + consumer_secret).toString(
                "base64"
            ),
            auth = "Basic " + buffer;
        request({
                url: url,
                headers: {
                    "Authorization": auth,
                },
            },
            function (error, response, body) {
                // TODO: Use the body object to extract OAuth access token
            }
        );
    }
}