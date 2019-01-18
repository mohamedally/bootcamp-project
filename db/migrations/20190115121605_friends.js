exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table
      .uuid('userOne')
      .notNull()
      .references('users.id')
    table
      .uuid('userTwo')
      .notNull()
      .references('users.id')
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNull()
    table
      .timestamp('updatedAt')
      .defaultTo(knex.fn.now())
      .notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friends')
}
