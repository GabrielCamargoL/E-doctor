'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Doubt extends Model {
  doctor () {
    return this.belongsTo('App/Models/Doctor')
  }
}

module.exports = Doubt
