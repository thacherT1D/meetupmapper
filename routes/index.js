var express = require('express');
var router = express.Router();

var rp = require('request-promise');

var helpers = require('../db/helpers');
var queries = require('../db/queries');
//var validations = require('./validations');
//var auth = require('./auth');

//var radius = 50;

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/events', function(req, res, next) {
  //helpers.getEvents();
});

router.post('/', function(req, res, next) {
  var lat = '47.63522';
  var lon = '-122.344272';
  helpers.get_events2(lat, lon, req.body.categories).then(result => {
    console.log(result);
  });

/* *** THIS SHIT WORKS DO NOT THROW IT AWAY ***
  helpers.convert_zip(req.body.zipcode).then(lat => {
    console.log(lat, lon);
  });

  helpers.get_events(req.body.zipcode, req.body.categories).then(markers => {
    console.log(markers);
  });
*/
});

module.exports = router;
