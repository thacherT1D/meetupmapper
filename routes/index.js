var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var helpers = require('../db/helpers');
var queries = require('../db/queries');

var userZip;
var radius = 50;
var key = '7731a58403d7c1d1d331c3e714c349';
var mapKey = 'pk.eyJ1Ijoic2FuZHlnaWxmaWxsYW4iLCJhIjoiY2luOWg3NGt2MXRqaHR5bHlibWc0c2t1diJ9.yQYGYNLuWKMFPvWoPZAyYg';
var markers = [];
var z;
var category;
var lat = '&lat=47.63522';
var lon = '&lon=-122.344272';
var r = '&radius=' + radius.toString();

/* GET home page. */
router.get('/', function(res, res, next) {
  res.render('map');
})

router.get('/map', function(req, res, next) {

  if(req.query.lat && req.query.lon) {
    lat = '&lat=' + req.query.lat;
    lon = '&lon=' + req.query.lon;
  }

  // if(req.query.category) {
  //   category = '&category=' + req.query.category;
  // }

  category = '&category=30';

  console.log('https://api.meetup.com/2/open_events?key='+key+lat+lon+category+'&status=upcoming');
  rp({uri:'https://api.meetup.com/2/open_events?key='+key+lat+lon+category+'&status=upcoming'
}).then(function(data) {
  markers = [];
  var parseData = (JSON.parse(data));
  for(var i = 0; i < parseData.results.length; i++) {
    var marker = parseData.results[i];

    var date = new Date(marker.time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >=12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    marker.time = hours + ':' + minutes + " " + ampm;

    console.log(marker.group);

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
          'name': marker.name,
          'description': marker.description,
          'rsvp': marker.yes_rsvp_count,
          'startTime': marker.time
        }
        });
      }
    }
    res.render('map', {
      markers: JSON.stringify(markers),
      lat: req.query.lat || 47.63522,
      lon: req.query.lon || -122.344272
    })
  });
});

router.post('/zip', function(req, res, next) {
  userZip = req.body.zip;
  category = req.body.category;

  rp({uri:'https://api.mapbox.com/geocoding/v5/mapbox.places/'+userZip+'.json?country=us&proximity=39.8977%2C%2077.0365&autocomplete=true&access_token='+mapKey})
  .then(function(data) {
    var parseD = (JSON.parse(data));
    lon = parseD.features[0].center[0];
    lat = parseD.features[0].center[1];
    res.redirect('/map?lat=' + lat + '&lon=' + lon + '&category=' + category);
  })
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
