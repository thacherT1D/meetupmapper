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
  // var lat = '47.63522';
  // var lon = '-122.344272';
  helpers.convert_zip(req.body.zipcode).then(latlong => {
    helpers.get_events(latlong.lat, latlong.lon, req.body.categories).then(result => {
      console.log(markers_details);
    });
  });
});

module.exports = router;
