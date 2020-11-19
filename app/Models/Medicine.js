'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Medicine extends Model {
  medical_appointment () {
    return this.belongsTo('App/Models/MedicalAppointment', 'medical_appointment_id', 'id')
  }
}

module.exports = Medicine
