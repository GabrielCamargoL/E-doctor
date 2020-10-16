'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicalInfoSchema extends Schema {
  up () {
    this.create('medical_infos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.decimal('weight')
      table.decimal('height')
      table.string('blood_type')
      table.string('health_problems')
      table.string('allergy')
      table.string('personal_medicine')
      table.timestamps()
    })
  }

  down () {
    this.drop('medical_infos')
  }
}

module.exports = MedicalInfoSchema