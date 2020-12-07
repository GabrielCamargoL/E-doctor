'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicineSchema extends Schema {
  up () {
    this.table('medicines', (table) => {
      // alter table
      table.string('quantity')
      table.string('unit')
    })
  }

  down () {
    this.table('medicines', (table) => {
      // reverse alternations
      table.string('quantity')
      table.string('unit')
    })
  }
}

module.exports = MedicineSchema
