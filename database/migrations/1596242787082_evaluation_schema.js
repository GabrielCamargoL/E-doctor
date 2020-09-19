'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvaluationSchema extends Schema {
  up () {
    this.create('evaluations', (table) => {
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
      table.string('comment')
      table.decimal('score')
      table.timestamps()
    })
  }

  down () {
    this.drop('evaluations')
  }
}

module.exports = EvaluationSchema
