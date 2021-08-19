const con = require("../config/config").con;
const Schema = con.Schema;

let date = Date.now();
var accessSchema = new Schema({
    timestamp: {
        type: Date,
        default: date
    },
    userId: String,
    token: String,
    expirytime: String
}, {
    _id: true,
    autoIndex: false,
});

access = con.model("access", accessSchema);
module.exports = access;