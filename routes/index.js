var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var helpers = require('../db/helpers');
var queries = require('../db/queries');

var userZip = 98122;
var radius = 50;
var userLat;
var userLon;
var key = '7731a58403d7c1d1d331c3e714c349';
var markers = [];
var z;
var r = '&radius=' + radius.toString();

/* GET home page. */
router.get('/', function(res, res, next) {
  res.render('map');
})

router.get('/map', function(req, res, next) {
  z = '&zip=' + req.query.zip;
  rp({uri:'https://api.meetup.com/2/open_events?key='+key+z+'&status=upcoming'
}).then(function(data) {
  var parseData = (JSON.parse(data));
  for(var i = 0; i < parseData.results.length; i++) {
    var marker = parseData.results[i];
    if(parseData.results[i].hasOwnProperty('venue')) {
      markers.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [marker.venue.lat, marker.venue.lon]
          // coordinates: [47.6, -122.3]
        },
        properties: {
          image: '',
          url: marker.event_url,
          // marker-symbol: 'star',
          // marker-color: '#ff8888',
          // marker-size: 'large',
          city: marker.name
        }
        });
      }
    }
    console.log(markers[0].type);
    res.render('map', {
      markers: markers

  })
  });
});
//
// 'type': 'Feature',
// 'geometry': {'type': 'Point', 'coordinates': JSON.parse(JSON.stringify([parseFloat(marker.venue.lat), parseFloat(marker.venue.lon)]))},
// 'properties': {
//   'image':'',                       //image url
//   'url': marker.event_url,
//   'marker-symbol': 'star',
//   'marker-color': '#ff8888',
//   'marker-size': 'large',
//   'city': marker.name
//   }
// marker.id,
// eventName: marker.name,
// eventUrl: marker.event_url,
// fee: marker.fee,
// venueName: marker.venue.name,
// rsvpCount: marker.yes_rsvp_count,
// rsvpLimit: marker.rsvp_limit,
// lat: marker.venue.lat,
// lon: marker.venue.lon,
// venuePhone: marker.venue.phone,
// description: marker.description,
// groupPhoto: marker.group,

router.post('/zip', function(req, res, next) {
  userZip = req.body.zip;
  res.redirect('/map?zip=' + userZip);
});

// router.post('/', function(req, res, next) {

// };

module.exports = router;
