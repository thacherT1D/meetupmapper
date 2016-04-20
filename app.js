var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport');
var bluebird = require('bluebird');
var knex = require('knex');
require('dotenv').load();
var MeetupOAuth2Strategy = require('passport-meetup-oauth2').Strategy;
var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new MeetupOAuth2Strategy ({
  clientID: process.env.MEETUP_KEY,
  clientSecret: process.env.MEETUP_SECRET,
  callbackURL: 'http://localhost:3000/auth/meetup/callback',
}, function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  //store accessToken in database for userauth
  process.nextTick(function() {
    return done(null, profile);
  });
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ name: 'session', keys: [process.env.SESSION_KEY] }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//   res.locals.user = req.user;
//   next();
// });

app.use('/', routes);
app.use('/users', users);

app.get('/auth/meetup',
  passport.authenticate('meetup'),
  function(req, res) {

  });

app.get('/auth/meetup/callback',
  passport.authenticate('meetup', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
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

app.listen(3000, function (err) {
  if (err) {
     console.log(err);
  } else {
     console.log("App started at port 3000");
  }
});

module.exports = app;
