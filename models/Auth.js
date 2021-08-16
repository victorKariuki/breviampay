const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var AuthSchema = new Schema({
  timestamp: {
    type: String,
    default: date,
  },
  access_token: String,
  expiry_date: Number

}, {
  _id: true,
  autoIndex: false,
});

Auth = con.model("Auth", AuthSchema);
module.exports = Auth;