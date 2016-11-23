module.exports = function (app) {
  app.get('/', require('./home').get);
  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);
  app.get('/signup', require('./signup').get);
  app.post('/signup', require('./signup').post);
  app.post('/logout', require('./logout').post);
  app.get ('/user/:id', require('./user').get);
  app.get ('/user/:id', function (req, res) {
    var id = req.params.id;
  });
  
};