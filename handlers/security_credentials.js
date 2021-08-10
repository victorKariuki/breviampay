var crypto = require("crypto");
var constants = require("constants");

// CAUTION: This is a 512 bit RSA demo key - NEVER USE THIS SOMEWHERE FOR REAL!
var privatekey = "PATH_TO_CERTIFICATE_FILE";
var bufferToEncrypt = new Buffer.from("abc");

var encrypted = crypto.publicEncrypt(
  { key: privatekey, padding: constants.RSA_PKCS1_PADDING },
  bufferToEncrypt
);

console.log(encrypted.toString("base64"));