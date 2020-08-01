'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicalAppointmentSchema extends Schema {
  up () {
    this.create('medical_appointments', (table) => {
      table.increments()
      table
        .integer('clinic_id')
        .unsigned()
        .references('id')
        .inTable('clinics')
      table
        .integer('doctor_id')
        .unsigned()
        .references('id')
        .inTable('doctors')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.date('date').notNullable()
      table.string('reason').nullable()
      table.integer('status').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('medical_appointments')
  }
}

module.exports = MedicalAppointmentSchema
