exports.up = function(knex) {
  return knex.schema
    .createTable('departments', tbl => {
      tbl.increments('id');
      tbl.string('department', 128).notNullable();
    })
    .createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('username', 128).notNullable();
      tbl.string('password', 128).notNullable();

      tbl
        .integer('dept_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('departments');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('departments');
};
