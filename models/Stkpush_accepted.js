const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var AcceptedSchema = new Schema(
  {
    dateofCreation: {
      type: Number,
      default: date,
    },
    MerchantRequestID: String,
    CheckoutRequestID: String,
    ResultCode: String,
    ResultDesc: String,
    CallbackMetadata: {
      Item: [
        {
          Name: String,
          Value: String,
        },
      ],
    },
  },
  {
    _id: true,
    autoIndex: false,
  }
);

Accepted = con.model("Accepted", AcceptedSchema);
module.exports = Accepted;
