'use strict'

const Database = use('Database')
const MedicalInfo = use('App/Models/MedicalInfo')

class MedicalInfoController {

  async create ({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      const data = request.all()
      await MedicalInfo.create({...data, user_id: user.id})
      await trx.commit()
      return response.status(200).send()
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async show ({ params, request, response, auth }) {
    try {
      const user = await auth.getUser()
      const medicalinfo = await MedicalInfo.query()
        .where('user_id', user.id)
        .first()
      return response.status(200).send(medicalinfo)
    } catch (error) {
      return response.status(error.status).send(error)

    }
  }

  async update ({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const user = await auth.getUser()
      const medicalinfo = await MedicalInfo.query()
        .where('user_id', user.id)
        .first()

      const data = request.all()

      medicalinfo.merge(data)
      await medicalinfo.save(trx)

      await trx.commit()
      return response.status(200).send()
    } catch (error) {
      console.log(error);
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = MedicalInfoController
