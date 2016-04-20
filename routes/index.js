var express = require('express');
var router = express.Router();
var rp = require('request-promise');

var userZip = 98122;
var radius = 50;
var userLat;
var userLon;
var key = '7731a58403d7c1d1d331c3e714c349';
var markers = [];
var venueName;

rp({uri:'https://api.meetup.com/2/open_events?key='+key +'&zip='+userZip.toString()+'&radius='+radius.toString()+'&status=upcoming'
}).then(function(data) {
  var parseData = (JSON.parse(data));
  for(var i = 0; i < parseData.results.length; i++) {
    if(parseData.results[i].hasOwnProperty('venue')) {
      markers.push({
        name: parseData.results[i].venue.name,
        description: parseData.results[i].venue.zip,
        rsvpCount: parseData.results[i].yes_rsvp_count,
        lat: parseData.results[i].venue.lat,
        lon: parseData.results[i].venue.lon,

      })
    }
  }
  console.log(markers);
});
// console.log(markers);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(markers);
});





// router.post('/', function(req, res, next) {

// };

module.exports = router;
