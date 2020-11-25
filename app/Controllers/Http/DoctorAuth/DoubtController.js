'use strict'

const Doubt = use("App/Models/Doubt")
const Database = use('Database')

class DoubtController {
  async update({ request, response, params }) {
    const trx = await Database.beginTransaction()
    try {
      const doubt = await Doubt.findOrFail(params.id)
      const data = request.all()
      doubt.merge(data)
      await doubt.save(trx)
      await trx.commit()
      return response.status(200).send(doubt)
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
        .with('user')
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
        .with('user')
        .first()
      return response.status(200).send(doubt)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error)
    }
  }
}

module.exports = DoubtController
