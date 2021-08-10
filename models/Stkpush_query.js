const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var ConfirmSchema = new Schema(
  {
    dateofCreation: {
      type: Number,
      default: date,
    },
    ResponseCode: String,
    ResponseDescription: String,
    MerchantRequestID: String,
    CheckoutRequestID: String,
    ResultCode: String,
    ResultDesc: String,
  },
  {
    _id: true,
    autoIndex: false,
  }
);

Confirm = con.model("Confirm", ConfirmSchema);
module.exports = Confirm;
