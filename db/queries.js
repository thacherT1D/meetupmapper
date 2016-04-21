var knex = require('./knex');
var helpers = require('./helpers');

function Events() {
  return knex('events');
}
function Users() {
  return knex ('users');
}
function UsersEvents() {
  return knex('users_events');
}

function getEvents() {
  return knex('events').select('*', 'eventid').leftOuterJoin('users_events', 'eventid', 'eventid').leftOuterJoin('users', 'userid', 'userid');
}

function addEvent(event) {
  return knex('events').insert(event);
}

function addUser(accessToken) {
  console.log('made to helper function');
  Users().insert({ useraccess: accessToken }).then(function() {
    res.redirect('/');
  });
}

module.exports = {
  getEvents: getEvents,
  addEvent: addEvent,
  addUser: addUser
}
