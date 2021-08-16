const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var StatusSchema = new Schema(
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
      ResultParameter: [
        {
          Key: String,
          Value: String,
        },
      ],
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

Status = con.model("Status", StatusSchema);
module.exports = Status;
