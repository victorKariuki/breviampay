const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var BalSchema = new Schema(
  {
    dateofCreation: {
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
      ResultParameter: [
        {
          Key: String,
          Value: String,
        }
      ]
    },
    ReferenceData: {
      ReferenceItem: {
        Key: String,
        Value: String,
      }
    }
  },
  {
    _id: true,
    autoIndex: false,
  }
);

Bal = con.model("Bal", BalSchema);
module.exports = Bal;
