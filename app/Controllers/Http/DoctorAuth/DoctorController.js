'use strict'

//const Role = use('Role')
const Doctor = use("App/Models/Doctor")
const User = use("App/Models/User")
const Database = use('Database')

class DoctorController {
  async signIn({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      const token = await auth.attempt(email, password)

      return response.status(200).send(token)
    } catch (error) {
      console.log(error);
      return response.status(error.status).send({
        message: 'E-mail ou Senha incorretos'
      })
    }
  }

  async signUp({ request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const { email, password, ...data } = request.all()
      const user = await User.create({ email, password }, trx)
      await user.doctor().create(data, trx)
      await trx.commit()
      const token = await auth.withRefreshToken().attempt(email, password)

      return response.status(200).send(token)
    } catch (error) {
      console.log(error);
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
