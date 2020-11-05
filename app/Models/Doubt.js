'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Doubt extends Model {
  doctor () {
    return this.belongsTo('App/Models/Doctor')
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Doubt
