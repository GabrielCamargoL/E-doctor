'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Clinic extends Model {
  doctor () {
    return this.belongsTo('App/Models/Doctor', 'doctor_id', 'id')
  }
}

module.exports = Clinic
