'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicineSchema extends Schema {
  up() {
    this.create('medicines', (table) => {
      table.increments()
      table
        .integer('medical_appointment_id')
        .unsigned()
        .references('id')
        .inTable('medical_appointments')
      table.string('name')
      table
        .enu('period_type', ['In_Event', 'Interval', 'Exact_hour'])
        .defaultTo('Period')
      table.string('hours')
      table.integer('days')
      table.timestamps()
    })
  }

  down() {
    this.drop('medicines')
  }
}

module.exports = MedicineSchema
