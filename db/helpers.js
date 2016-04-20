// *** USER / PROFILE FUNCTIONS *** //

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

// *** MEETUP API FUNCTIONS *** //

function get_events (zipcode, category, timeframe) { //other options? more granular categories?
  /*
    1. Make call to Meetup API with parameters above
    2. Create array of event objects as such: [ { name, latitude, longitude, description, thumbnailUrl} ]
    3. Return array (to map_add_events function below)
  */
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

// *** GOOGLEMAPS API FUNCTIONS *** //

function map_add_events (eventArray) {
  /*
    1. Use get_events function to obtain array of events
    2. From array of event objects [ { name: eventName, latitude: eventLat, longitude: eventLong, shortDesc: 'text description of event', thumbUrl: url }], iterate over and add the pins, with the names and the short description and thumbnail
    4. If user is logged in, RSVP and SAVE buttons are loaded
    5. If event timeframe < 24 hours from now, pin is gold
  */
}

//there will likely be helper events to join the users / events tables and facilitate data transfer
