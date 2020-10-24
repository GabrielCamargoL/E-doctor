'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoctorSchema extends Schema {
  up () {
    this.create('doctors', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('surname', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('cpf', 14).nullable().unique()
      table.string('crm', 14).nullable()
      table.string('genre').nullable()
      table.string('birthday', 10).nullable()
      table.string('celphone', 15).nullable()
      table.string('zip_code').nullable()
      table.string('house_number').nullable()
      table.string('complement_address').nullable()
      table.string('state').nullable()
      table.string('city', 250).nullable()
      table.string('doctor_premium').nullable()
      table.string('neighborhood').nullable()
      table.string('street').nullable()
      table.string('path_avatar').nullable()
      table.string('specialty').nullable()
      table.string('score').nullable()
      table.string('number_of_evaluation').nullable()
      table.string('about')
      table.integer('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('doctors')
  }
}

module.exports = DoctorSchema