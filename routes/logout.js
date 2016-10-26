exports.post = function (err, res) {
    req.session.destroy();
    res.redirect('/');
};
