const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
let key_valSchema = new Schema({
  Key: String,
  Value: String,
}, {
  _id: false,
  autoIndex: false,
});
var B2BSchema = new Schema(
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
      ResultParameter: [key_valSchema]
    },
    ReferenceData: {
      ReferenceItem: [key_valSchema]
    },
  },
  {
    _id: true,
    autoIndex: false,
  }
);

B2B = con.model("B2B", B2BSchema);
module.exports = B2B;