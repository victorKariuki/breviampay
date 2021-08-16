const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
let key_valSchema = new Schema(
  {
    Key: String,
    Value: String,
  },
  {
    _id: false,
    autoIndex: false,
  }
);
var BalSchema = new Schema(
  {
    timestamp: {
      type: Number,
      default: date,
    },
    ResultType: String,
    ResultCode: String,
    ResultDesc: String,
    OriginatorConversationID: String,
    ConversationID: String,
    TransactionID: String,
    ResultParameters: {
      ResultParameter: [key_valSchema],
    },
    ReferenceData: {
      ReferenceItem: {
        Key: String,
        Value: String,
      },
    },
  },
  {
    _id: true,
    autoIndex: false,
  }
);

Bal = con.model("Bal", BalSchema);
module.exports = Bal;
