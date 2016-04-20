var express = require('express');
var router = express.Router();
var rp = require('request-promise');

var userZip = 98122;
var radius = 50;
var userLat;
var userLon;
var key = '7731a58403d7c1d1d331c3e714c349';
var markers = [];

var r = '&radius=' + radius.toString();
var z = '&zip=' + userZip.toString();

rp({uri:'https://api.meetup.com/2/open_events?key='+key+z+r+'&status=upcoming'
}).then(function(data) {
  var parseData = (JSON.parse(data));
  for(var i = 0; i < parseData.results.length; i++) {
    var marker = parseData.results[i];
    if(parseData.results[i].hasOwnProperty('venue')) {
      markers.push({
        eventId: marker.id,
        eventName: marker.name,
        eventUrl: marker.event_url,
        fee: marker.fee,
        venueName: marker.venue.name,
        rsvpCount: marker.yes_rsvp_count,
        rsvpLimit: marker.rsvp_limit,
        lat: marker.venue.lat,
        lon: marker.venue.lon,
        venuePhone: marker.venue.phone,
        description: marker.description,
        // groupPhoto: marker.group,
      })

    }
  }
  console.log(markers);
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(markers);
});





// router.post('/', function(req, res, next) {

// };

module.exports = router;
