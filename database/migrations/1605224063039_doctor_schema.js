'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoctorSchema extends Schema {
  up () {
    this.table('doctors', (table) => {
      table.decimal('totalStars', 12, 2).defaultTo(5)
    })
  }

  down () {
    this.table('doctors', (table) => {
      // reverse alternations
      table.decimal('totalStars')
    })
  }
}

module.exports = DoctorSchema
