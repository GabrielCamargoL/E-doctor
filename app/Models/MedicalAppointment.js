'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MedicalAppointment extends Model {
  user () {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }

  doctor () {
    return this.belongsTo('App/Models/Doctor', 'doctor_id', 'id')
  }

  clinic () {
    return this.belongsTo('App/Models/Clinic', 'clinic_id', 'id')
  }
}

module.exports = MedicalAppointment
