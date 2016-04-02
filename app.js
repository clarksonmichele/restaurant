var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer');

//reference mongoose to talk to the database - npm install mongoose
var mongoose = require('mongoose');

//reference the authorization packages
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;

//reference the routes controllers - mapping urls
var routes = require('./routes/index');
var menus = require('./routes/menus');
var auth = require('./routes/auth');
var basilicos = require('./routes/basilicos');
//reference the express npm
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//handle file uploads 
//app.use(multer({ dest: './public/images/uploads' }));


//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//enable flash to show messages
app.use(flash());

//passport configuration - initialize a session 
app.use(session({
  secret: 'basil auth',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//use account model to authenticate
var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.use(new localStrategy(Account.authenticate()));

//session data methods
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', routes);
app.use('/menus', menus);
app.use('/auth', auth);
app.use('/basilicos', basilicos);

//reference the db connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB Error: '));

db.once('open', function(callback) {
  console.log('Connected to mongodb');
});

//reference db connection string that is in the config file
var configDb = require ('./config/db.js');
mongoose.connect(configDb.url);

//404 - forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//dev error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

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
