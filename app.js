var express = require('express'),
    engine = require('ejs-mate'),
    app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var session= require ('express-session')
var routes = require('./routes/index');
var users = require('./routes/user');
var login = require ('./routes/login');
var HttpError = require ('config/error').HttpError;
app.use(require('middleware/sendHttpError'));
var MongoStore = require ('connect-mongo')(session);
var config = require ('config');
var helpers = require('express-helpers')(app);
app.engine ('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.get('session:secret'),
    key: config.get ('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(require('middleware/loaduser'));
app.use(express.static(path.join(__dirname, 'public')));
require('routes')(app);


app.use('/', routes);
//app.use('/users', users);
//app.use('/login', login);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  if (typeof err == 'number'){
    err = new HttpError(err);
  }
  
  if (err instanceof HttpError){
    res.sendHttpError(err);
  } else {
    if (app.get('env') === 'development') {
      express._errorHandler()(err, req, res, next);
    } else {
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
