var User = require ('models/user').User;
exports.get = function (req, res) {
  var id =req.params.id;
  var username = req.params.username;
  res.render('user', {id:id, username:username});
};
