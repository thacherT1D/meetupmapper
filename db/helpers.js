// *** USER / PROFILE FUNCTIONS *** //
var queries = require('./queries');
var rp = require('request-promise');

var key = '7731a58403d7c1d1d331c3e714c349';
var mapKey = 'pk.eyJ1Ijoic2FuZHlnaWxmaWxsYW4iLCJhIjoiY2luOWg3NGt2MXRqaHR5bHlibWc0c2t1diJ9.yQYGYNLuWKMFPvWoPZAyYg';

// *** MEETUP API FUNCTIONS *** //

function get_events (zipcode, category) {
  var userZip = '&zip=' + zipcode;
  var markers = [];
  return rp({ uri:'https://api.meetup.com/2/open_events?key=' + key + userZip +'&status=upcoming'}).then(function(data) {
    var eventData = (JSON.parse(data));
    for(var i = 0; i < eventData.results.length; i++) {
      var marker = eventData.results[i];
      if (eventData.results[i].hasOwnProperty('venue')) {
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
        });
      }
    }
    return markers;
  });
}

function convert_zip (userZip) {
  return rp({uri:'https://api.mapbox.com/geocoding/v5/mapbox.places/'+userZip+'.json?country=us&proximity=39.8977%2C%2077.0365&autocomplete=true&access_token='+mapKey}) .then(function(data) {
    var parseD = (JSON.parse(data));
    var lon = parseD.features[0].center[0];
    var lat = parseD.features[0].center[1];
    return lat, lon;
  });
}

function display_event (eventID) {
  /*
    1. make request to meetup API with event ID
    2. display clipped info on popup

    -- OR --
    1. check db for cached event by ID
    2. if not, pull info from meetup api, cache, and display
    3. otherwise, display info from cache
  */
}

// *** USER FUNCTIONS *** //

function user_rsvp (user, event) {
  /*
    1. get event ID from google maps click
    2. send alongside user access code
    3. return to queryPromise for POST method
  */
}

function user_like_event (user, event) {
  /*
    1. get event ID from google maps click
    2. save in the 'events' table with the correct user ID and update join table
    3. then add event thumbnail to user profile
  */
}

function user_unlike_event (user, event) {
  /*
    1. get event ID from user click event
    2. remove event thumbnail from user profile on site
    3. return event ID to queryPromise in order to remove from database
  */
}

// *** GOOGLEMAPS API FUNCTIONS *** //

function map_add_events (eventArray) {
  /*
    1. Use get_events function to obtain array of events
    2. From array of event objects [ { name: eventName, latitude: eventLat, longitude: eventLong, shortDesc: 'text description of event', thumbUrl: url }], iterate over and add the pins, with the names and the short description and thumbnail
    4. If user is logged in, RSVP and SAVE buttons are loaded
    5. If event timeframe < 24 hours from now, pin is gold
  */
}

module.exports = {
  user_rsvp: user_rsvp,
  user_like_event: user_like_event,
  user_unlike_event: user_unlike_event,
  convert_zip: convert_zip,
  get_events: get_events,
  display_event: display_event,
  map_add_events: map_add_events
}

//there will likely be helper events to join the users / events tables and facilitate data transfer
