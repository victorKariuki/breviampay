let templates = (body) => {
    this.ContactThroughWeb = {
        subject: "Contact through website",
        html: "<p>You have a massage from: " +
            body.name +
            ". </p>" +
            "<p>Contact:<br> Phone Number: <a href='tel:" +
            body.phone +
            "'>" +
            body.phone +
            "</a><br>Email: <a href='mailto:" +
            body.email +
            "'>" +
            body.email +
            "</a></p>" +
            "<p>Message: " +
            body.message +
            "</p>",
    }
    this.verify = {
        subject: "Verification Code",
        html: "<p>Follow link to verify your account: " +
            body.link +
            "</p><p>This link expires after 6 hours: @ " +
            body.time +
            "</p>"
    };
    return this;
};

module.exports = templates;