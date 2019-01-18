exports.up = function(knex, Promise) {
  return knex.schema.createTable('friend_requests', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table
      .uuid('sender')
      .notNull()
      .references('users.id')
    table
      .uuid('receiver')
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
  return knex.schema.dropTable('friend_requests')
}
