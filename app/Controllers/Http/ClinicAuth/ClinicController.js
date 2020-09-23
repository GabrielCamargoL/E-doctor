'use strict'

const Clinic = use("App/Models/Clinic")
const Database = use('Database')

class ClinicController {

  async create({ request, response, params }) {
    const trx = await Database.beginTransaction()
    try {
      const data = request.all()
      const clinic = await Clinic.create({...data, doctor_id: params.id})
      await trx.commit()
      return response.status(200).send(clinic)
    } catch (error) {
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async getClinic({ response, params }) {
    try {
      const clinic = await Clinic.query()
        .where('id', '=', params.id)
        .with('doctor')
        .first()
      return response.status(200).send(clinic)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async update({ request, params, response }) {
    const trx = await Database.beginTransaction()
    try {
      const clinic = await Clinic.findOrFail(params.id)
      const data = request.all()
      clinic.merge(data)
      await clinic.save(trx)
      await trx.commit()
      return response.status(200).send(clinic)
    } catch (error) {
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async destroy({ response, params }) {
    try {
      const clinic = await Clinic.findOrFail(params.id)
      await clinic.delete();
      return response.status(200).send('Clínica deletada !!!')
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

module.exports = ClinicController
