var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var helpers = require('../db/helpers');
var queries = require('../db/queries');

var userZip;
var radius = 50;
var userLat;
var userLon;
var key = '7731a58403d7c1d1d331c3e714c349';
var mapKey = 'pk.eyJ1Ijoic2FuZHlnaWxmaWxsYW4iLCJhIjoiY2luOWg3NGt2MXRqaHR5bHlibWc0c2t1diJ9.yQYGYNLuWKMFPvWoPZAyYg'
var markers = [];
var z;
var lat = 47.6;
var lon = 122.3;
var r = '&radius=' + radius.toString();

/* GET home page. */
router.get('/', function(res, res, next) {
  res.render('map');
})

router.get('/map', function(req, res, next) {
  // z = '&zip=' + req.query.zip;
  if(req.query.lat && req.query.lon) {
    lat = '&lat=' + req.query.lat;
    // console.log(lat + 'is req.query.lat');
    lon = '&lon=' + req.query.lon;
    // console.log(lon + 'is req.query.lon');
  }
  // console.log(req.query);
  // console.log(req.query.lat + ' is req.query.lat');
  // console.log(req.query.lon + ' is req.query.lon');
  rp({uri:'https://api.meetup.com/2/open_events?key='+key+lat+lon+'&status=upcoming'
}).then(function(data) {
  markers = [];
  var parseData = (JSON.parse(data));
  for(var i = 0; i < parseData.results.length; i++) {
    var marker = parseData.results[i];
    if(parseData.results[i].hasOwnProperty('venue')) {
      markers.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [marker.venue.lon, marker.venue.lat]
        },
        properties: {
          image: '',
          url: marker.event_url,
          'marker-symbol': 'star',
          'marker-color': '#ff8888',
          'marker-size': 'large',
          'city': marker.name + marker.description
        }
        });
      }
    }
    res.render('map', {
      markers: JSON.stringify(markers),
      // zip: req.query.zip
    })
  });
});

router.post('/zip', function(req, res, next) {
  userZip = req.body.zip;
  console.log(userZip);
  var options = {
    uri:'https://api.mapbox.com/geocoding/v5/mapbox.places/'+userZip+'.json',
    qs: {
      access_token: mapKey,
      autocomplete: true,
      proximity: [39.8977, 77.0365],
      country: 'us'
    },
    json: true
  }
  rp(options).then(function(data) {
    console.log(data);
    var parseD = (JSON.parse(data));
    lon = parseD.features[0].center[0];
    console.log(lon + " is longitude before redirect");
    lat = parseD.features[0].center[1];
    console.log(lat + ' is lattitude before redirect');
  })
  res.redirect('/map?lat=' + lat + '&lon=' + lon);
});

module.exports = router;
// router.post('/', function(req, res, next) {

// };

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
