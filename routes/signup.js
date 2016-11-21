var User = require ('models/user').User;
var async = require('async');
var session = require('express-session');
var HttpError = require ('config/error').HttpError;

exports.get = function (req, res) {
    res.render('signup');
};


exports.post = function (req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;


    User.signup(email,username,password, function (err, user) {
        if (err) {
            if (err instanceof HttpError) {
                return next (new HttpError(403, "User existing"));
            }
        } else {
            req.session.user = user._id;
            res.redirect("/");
        }

    });

};
