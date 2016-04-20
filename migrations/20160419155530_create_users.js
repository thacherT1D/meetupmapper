
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meetupusers', function (table) {
      table.increments('userid');
      table.integer('useraccess');
    }),
    knex.schema.createTable('meetupevents', function (table) {
      table.increments('eventid');
      table.integer('eventcode');
    }),
    knex.schema.createTable('meetupusers_events', function ( table) {
      table.incremenets('userseventsid');
      table.integer('userid');
      table.integer('eventid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
