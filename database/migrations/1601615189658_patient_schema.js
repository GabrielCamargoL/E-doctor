'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up () {
    this.create('patients', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('username', 80).notNullable()
      table.string('surname', 80).notNullable()
      table.string('cpf', 14).notNullable().unique()
      table.string('genre').nullable()
      table.string('birthday', 10).nullable()
      table.string('phone', 15).notNullable()
      table.string('zip_code').nullable()
      table.string('house_number').nullable()
      table.string('complement_address').nullable()
      table.string('state').notNullable()
      table.string('city', 250).notNullable()
      table.string('user_premium').nullable()
      table.string('neighborhood').notNullable()
      table.string('street').notNullable()
      table.string('path_avatar').nullable()
      table.integer('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('patients')
  }
}

module.exports = PatientSchema
