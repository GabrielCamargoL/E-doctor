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
      table.datetime('consultation_schedule').notNullable()
      table.string('reason').nullable()
      table
        .enu('status', ['Rejected', 'Pending', 'Accepted', 'Done', 'Canceled'])
        .defaultTo('Pending')
      table.string('exam_path').nullable()
      table.string('prescription').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('medical_appointments')
  }
}

module.exports = MedicalAppointmentSchema
