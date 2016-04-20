var express = require('express');
var router = express.Router();
var rp = require('request-promise');

var userZip = 98122;
var radius = 20;
var userLat;
var userLon;
var key = '7731a58403d7c1d1d331c3e714c349';
var markers = [];

rp({uri:'https://api.meetup.com/2/open_events?key='+key +'&zip='+userZip.toString()+'&radius'+radius.toString()+'&status=upcoming'
}).then(function(data) {
  var parseData = (JSON.parse(data));
  for(var i = 0; i < parseData.results.length; i++) {
    // console.log(parseData.results[i]);
    try {
      console.log('WOOT');
      var nameVal = parseData.results[i].venue.name;
      markers.push({
        name: nameVal,
        description: parseData.results[i].venue.zip,
        rsvpCount: parseData.results[i].yes_rsvp_count,
        lat: parseData.results[i].venue.lat,
        lon: parseData.results[i].venue.lon,
      });
    } catch (err){
      console.log(err)
    }
  }
}).catch(function(err) {
  console.log(err);
});

// console.log(markers);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
