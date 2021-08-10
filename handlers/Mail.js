var nodemailer = require("nodemailer");
const user = require("../config/config").user;

module.exports = (mailOptions, respond,res) => {
    ("use strict");
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: user.mail,
            pass: user.pass,
        },
    });
    mailOptions.from = user.mail;
    mailOptions.to = user.to;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.dir(error);
            res.status(500)
        } else {
            console.log("Email sent: " + info.response);
           respond();
        }
    });
};