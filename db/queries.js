var knex = require('./knex');

function getEvents() {
  return knex('events')
    .select('*', 'eventid')
    .leftOuterJoin('users_events', 'eventid', 'eventid')
    .leftOuterJoin('users', 'userid', 'userid');
}

function addEvent(event) {
  return knex('events')
    .insert(event);
}
