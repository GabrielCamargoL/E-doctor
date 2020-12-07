'use strict'

const Medicine = use("App/Models/Medicine")
class MedicineController {

  index({ request, response, view }) {
  }

  async create({ request, response, view }) {
  }

  async show({ params, request, response, view }) {
    const medicine = Medicine.query()
      .where("medical_appointment_id", params.appointment_id)
      .fetch()

    return medicine
  }


  async update({ params, request, response }) {
  }


  async destroy({ params, request, response }) {
  }
}

module.exports = MedicineController
