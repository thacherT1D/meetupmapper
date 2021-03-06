
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('userid');
      table.text('useraccess');
    }),
    knex.schema.createTable('events', function (table) {
      table.increments('eventid');
      table.integer('eventcode');
      table.text('eventname');
      table.text('eventpicurl');
    }),
    knex.schema.createTable('users_events', function ( table) {
      table.increments('userseventsid');
      table.integer('userid');
      table.integer('eventid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('users_events')
  ]);
};
