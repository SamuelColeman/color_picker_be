
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.integer('projectId').unsigned();
      table.unique('projectId');
      table.string('name');
      table.unique('name');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.integer('projectId').unsigned();
      table.foreign('projectId').references(projects.projectId);
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('palettes')
  ])
  
};
