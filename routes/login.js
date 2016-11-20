var User = require ('models/user').User;
var AuthError = require ('models/user').AuthError;
var HttpError = require ('config/error').HttpError;
var async = require('async');
var session = require('express-session');


exports.get = function (req, res) {
    res.render('login');
};

exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;


    User.authorize(username, password, function (err, user) {
        if (err) {
            if (err instanceof HttpError) {
                return next(new HttpError(404, "User not found :("));// исправить на httperror если че
            }
        }
    else {
            req.session.user = user._id;
            //res.send({});
            res.redirect("/");
        }

});

};