const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = function Registration(x, y) {
    User.findOne({
        phoneNumber: x.phoneNumber
    }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user == null) {
                let newUser = new User(x);
                // hash passwords
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then((user) => {
                                y.success.a('You are registered successfully');
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    });
                });
            } else {
                if (user.phoneNumber == x.phoneNumber) {
                    y.warning.a('Phone Number has already registered an account');
                }
            };
        };
    });

}