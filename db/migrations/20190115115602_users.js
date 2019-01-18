exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table.text('name').notNull()
    table
      .text('email')
      .notNull()
      .unique()
    table.text('password').notNull()
    table.text('house').nullable()
    table.text('concentration').nullable()
    table.text('hometown').nullable()
    table.text('hobbies').nullable()
    table.date('birthday').nullable()
    table.text('gender').nullable()
    table.text('bio').nullable()
    table.text('picture').nullable()
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
  return knex.schema.dropTable('users')
}
