'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoctorSchema extends Schema {
  up () {
    this.table('doctors', (table) => {
      // alter table
      table.string("fcmToken");
    })
  }

  down () {
    this.table('doctors', (table) => {
      // reverse alternations
      table.string("fcmToken");
    })
  }
}

module.exports = DoctorSchema
