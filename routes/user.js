var User = require ('models/user').User;
var mongoose = require('mongoose');
var async = require('async');
var HttpError = require ('config/error').HttpError;

/*exportId = function (id) {

  User.findById(id, function (err, user) {
    var username2;
    console.log('start');
    if (user) {
      username2 = user.get('username');
      console.log(username2);
      return username2;

    } else {
      console.log('2');
      return new HttpError(402, "hueta");
    }
  });
};*/
exports.get = function (req, res) {
  var id =req.params.id;
  var username2 = User.findById(id, function (err,user) {
    res.render('user', {id:id, username:user.username});
  });

};



