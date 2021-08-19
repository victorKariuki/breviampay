const con = require("../config/config").con;
const Schema = con.Schema;

let date = new Date();
let adressSchema = new Schema({
  default: Boolean,
  title: String,
  location: [Number],
  address: {
    street: String,
    country: String,
    county: String,
    constituency: String,
    neighbourhoodName: String,
    buildingName: String,
    suite: String
  },
}, {
  _id: true,
  autoIndex: false,
});
var UserSchema = new Schema({
  user: {
    lastName: String,
    firstName: String,
  },
  userMail: {
    type: String,
  },
  consumer_key: String,
  consumer_secret: String,
  gender: String,
  company: String,
  address: [adressSchema],
  phoneNumber: String,
  password: String,
  verified: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: date,
  },
}, {
  _id: true,
  autoIndex: false,
});

User = con.model("User", UserSchema);
module.exports = User;