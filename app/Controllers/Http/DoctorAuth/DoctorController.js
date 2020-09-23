'use strict'

const Doctor = use("App/Models/Doctor")
const Database = use('Database')

class DoctorController {
  async signIn({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const doctor = await Doctor.findByOrFail('email', email)
    return { token, doctor }
  }

  async signUp({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const { email, password, ...data } = request.all()
      const user = await Doctor.create({ email, password, ...data }, trx)
      await trx.commit()
      return response.status(200).send(user)
    } catch (error) {
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async getUser({ response, params }) {
    try {
      const doctor = await Doctor.findOrFail(params.id)
      return response.status(200).send(doctor)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async update({ request, params, response }) {
    const trx = await Database.beginTransaction()
    try {
      const doctor = await Doctor.findOrFail(params.id)
      const data = request.all()
      doctor.merge(data)
      await doctor.save(trx)
      await trx.commit()
      return response.status(200).send(doctor)
    } catch (error) {
      await trx.rollback()
      return response.status(error.status).send(error)
    }
  }

  async destroy({ response, params }) {
    try {
      const doctor = await Doctor.findOrFail(params.id)
      await doctor.delete();
      return response.status(200).send('usuário deletado com sucesso')
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}

module.exports = DoctorController
