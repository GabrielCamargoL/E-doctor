'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('surname', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('cpf', 14).nullable().unique()
      table.string('genre').nullable()
      table.string('birthday', 10).nullable()
      table.string('celphone', 15).nullable()
      table.string('zip_code').nullable()
      table.string('house_number').nullable()
      table.string('complement_address').nullable()
      table.string('state').nullable()
      table.string('city', 250).nullable()
      table.string('user_premium').nullable()
      table.boolean('user_verified').nullable()
      table.string('neighborhood').nullable()
      table.integer('public_neighborhood').defaultTo(0)
      table.string('street').nullable()
      table.string('path').nullable()
      table.integer('user_updated').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema