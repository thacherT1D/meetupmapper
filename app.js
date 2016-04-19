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
var MeetupOAuth2Strategy = require('passport-oauth2-meetup').Strategy;
var app = express();

//https://secure.meetup.com/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth%2Fmeetup%2Fcallback&client_id=bphv01d3g1ri99st031it4m87h

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new MeetupOAuth2Strategy({
  clientID: process.env.MEETUP_KEY,
  clientSecret: process.env.MEETUP_SECRET,
  callbackURL: "https://localhost:3000/auth/meetup/callback",
  autoGenerateUsername: true,
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', routes);
app.use('/users', users);

app.get('/auth/meetup',
  passport.authenticate('meetup', {
    successRedirect: '/profile/meetup',
    failureRedirect: '/login'
  })
  // passport.authenticate('meetup', { session: false }),
  // function(req, res) {
  //   res.json(req.user);
  // }
);

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


module.exports = app;
