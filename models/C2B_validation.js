const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var ValidateSchema = new Schema(
  {
    dateofCreation: {
      type: Number,
      default: date,
    },
    TransactionType: String,
    TransID: String,
    TransTime: String,
    TransAmount: String,
    BusinessShortCode: String,
    BillRefNumber: String,
    InvoiceNumber: String,
    OrgAccountBalance: String,
    ThirdPartyTransID: String,
    MSISDN: String,
    FirstName: String,
    MiddleName: String,
    LastName: String,
  },
  {
    _id: true,
    autoIndex: false,
  }
);

Validate = con.model("Validate", ValidateSchema);
module.exports = Validate;
