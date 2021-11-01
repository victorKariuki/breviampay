const mongoose = require("mongoose");

let dbName = "";

mongoose.set("useUnifiedTopology", true);

let atlas =
    "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/" +
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
    mail: "<username>@gmail.com",
    pass: "",
    to: "<receipient>",
};
//daraja credentials
var mpesaApi = {
  consumer: {
    key: "",
    secret: "",
  },
  initiator: "testapi",
  sender: "",
  testpartya: "",
  testpartyb: "",
  phoneNumber: "",
  pass: "",
  shortcode: "",
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
};
let host = "https://<callbak url host>";
module.exports = {
    dbName: dbName,
    host: host,
    user: user,
    mpesaApi: mpesaApi
};
