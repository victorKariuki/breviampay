const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var QuerySchema = new Schema(
  {
    timestamp: {
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

Query = con.model("Query", QuerySchema);
module.exports = Query;
