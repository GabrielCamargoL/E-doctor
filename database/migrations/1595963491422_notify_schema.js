'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotifySchema extends Schema {
  up () {
    this.create('notifies', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('recived_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('subject_metter', 1000)
      table.boolean('visible')
      table.timestamps()
    })
  }

  down () {
    this.drop('notifies')
  }
}

module.exports = NotifySchema