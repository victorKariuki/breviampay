const mongoose = require("mongoose");

let dbName = "breviamPay";

mongoose.set("useUnifiedTopology", true);

let atlas =
    "mongodb+srv://joker:J4I9IwpHTb3B6zgZ@joker.zmjyu.mongodb.net/" +
    dbName +
    "?retryWrites=true&w=majority",
    local =
    "mongodb://localhost:27017/" +
    dbName +
    "??retryWrites=true&w=majority&ssl=false";
var URI = local;

/* mongoose
    .connect(URI, {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB was successfuly connected..."))
    .catch((err) => console.log(err));
 */
let user = {
    mail: "buddyvikgachewa@gmail.com",
    pass: "xiozwjab#@whina%1969",
    to: "victor.k@breviamtechnologies.xyz",
};
var mpesaApi = {
  consumer: {
    key: "",
    secret: "",
  },
  initiator: "testapi",
  sender: "",
  testpartya: "600999",
  testpartyb: "600000",
  phoneNumber: "254708374149",
  pass: "Safaricom999!",
  shortcode: "174379",
  timestamp: function tStamp(date = new Date()) {
    function add(str, x) {
      if (x.length == 1) {
        return (str += "0" + x);
      }
      return (str += x);
    }
    let raw = [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString(),
      date.getDate().toString(),
      date.getHours().toString(),
      date.getMinutes().toString(),
      date.getSeconds(),
    ];
    let timestamp = "";
    raw.forEach((element) => {
      timestamp = add(timestamp, element);
    });
    return timestamp;
  },
  passKey:'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  securityCredential: "",
};
let host = "http://127.0.0.1:20213";
module.exports = {
    dbName: dbName,
    host: host,
    user: user,
    mpesaApi: mpesaApi
};