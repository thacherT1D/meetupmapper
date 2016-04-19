
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meetupusers', function (table) {
      table.increments('userid');
      table.integer('eventskey');
    }),
    knex.schema.createTable('likedevents', function (table) {
      table.increments('eventid');
      table.increments('')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
