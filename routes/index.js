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
  helpers.convert_zip(req.body.zipcode).then(latlong => {
    helpers.get_events(latlong.lat, latlong.lon, req.body.categories).then(result => {
      res.render('index', {
        markers: JSON.stringify(result[0]),
        lat: latlong.lat,
        lon: latlong.lon,
        details: result[1]
      });
    });
  });
});

module.exports = router;
