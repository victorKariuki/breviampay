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

mongoose
    .connect(URI, {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB was successfuly connected..."))
    .catch((err) => console.log(err));

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
    initiator: "",
    sender: "",
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
    securityCredential: "",
};
let host = "http://127.0.0.1:20213";
module.exports = {
    con: mongoose,
    db: mongoose.connection,
    dbURI: URI,
    dbName: dbName,
    host: host,
    user: user,
    mpesaApi: mpesaApi
};