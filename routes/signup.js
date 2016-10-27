var User = require ('models/user').User;
var AuthError = require ('models/user').AuthError;
var async = require('async');
var session = require('express-session');

exports.get = function (req, res) {
    res.render('signup');
};


exports.post = function (req, res, next) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;


    User.signup(email,username,password, function (err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(err);// исправить на httperror если че
            }
        }
        req.session.user = user._id;
        //res.send({});
        res.redirect("/");

    });

};
