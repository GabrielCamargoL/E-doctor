'use strict'

const Doubt = use("App/Models/Doubt")
const Database = use('Database')

class DoubtController {

  async create({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      const {doctor_id, ...data} = request.all()
      await Doubt.create({...data, doctor_id: doctor_id, user_id: user.id})
      await trx.commit()
      return response.status(200).send()
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async index({ response, auth }) {
    try {
      const user = await auth.getUser()
      const doubt = await Doubt.query()
        .where('user_id', user.id)
        .with('doctor')
        .fetch()

      return response.status(200).send(doubt)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }

  async getDoubt({ response, params }) {
    try {
      const doubt = await Doubt.query()
        .where('id', '=', params.id)
        .with('doctor')
        .first()
      return response.status(200).send(doubt)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }
}

module.exports = DoubtController
