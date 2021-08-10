const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var CancelledSchema = new Schema({
  dateofCreation: {
    type: Number,
    default: date,
  },
  MerchantRequestID: String,
  CheckoutRequestID: String,
  ResultCode: String,
  ResultDesc: String,
}, {
  _id: true,
  autoIndex: false,
});

Cancelled = con.model("Cancelled", CancelledSchema);
module.exports = Cancelled;