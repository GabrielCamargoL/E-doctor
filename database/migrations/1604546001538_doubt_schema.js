'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoubtSchema extends Schema {
  up () {
    this.create('doubts', (table) => {
      table.increments()
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
      table.string('doubt')
      table.string('answer')
      table.timestamps()
    })
  }

  down () {
    this.drop('doubts')
  }
}

module.exports = DoubtSchema
