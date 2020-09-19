'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClinicSchema extends Schema {
  up () {
    this.create('clinics', (table) => {
      table.increments()
      table
        .integer('doctor_id')
        .unsigned()
        .references('id')
        .inTable('doctors')
      table.string('name').nullable()
      table.string('celphone', 15).nullable()
      table.string('zip_code').nullable()
      table.string('house_number').nullable()
      table.string('complement_address').nullable()
      table.string('state').nullable()
      table.string('city', 250).nullable()
      table.string('neighborhood').nullable()
      table.string('street').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clinics')
  }
}

module.exports = ClinicSchema
