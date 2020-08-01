'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MedicalInfo extends Model {
  medical_info () {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }
}

module.exports = MedicalInfo
