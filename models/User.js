const con = require("../config/config").con;
const Schema = con.Schema;

let date = new Date();
var UserSchema = new Schema(
  {
    dateofCreation: {
      type: Date,
      default: date,
    },
  },
  {
    _id: true,
    autoIndex: false,
  }
);

User = con.model("User", UserSchema);
module.exports = User;
