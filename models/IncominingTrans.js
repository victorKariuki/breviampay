const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var incomingTransSchema = new Schema(
  {
    timestamp: {
      type: Number,
      default: date,
    },
    TransType: String,
    Initiator: String,
    TransID:String,
    TransTime:String,
    TransAmount:Number,
  },
  {
    _id: true,
    autoIndex: false,
  }
);

incomingTrans = con.model("incomingTrans", incomingTransSchema);
module.exports = incomingTrans;
