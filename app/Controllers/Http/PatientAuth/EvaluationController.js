'use strict'

const Evaluation = use("App/Models/Evaluation")
const User = use("App/Models/User")
const Doctor = use("App/Models/Doctor")
const Database = use('Database')

class EvaluationController {
  async index({ response }) {
    try {
      const evaluations = await Evaluation.all()

      return evaluations
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha interna. Tente novamente' })
    }
  }

  async show({ response, params }) {
    try {
      const evaluation = await Evaluation.findOrFail(params.id)

      return evaluation
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha interna. Tente novamente' })
    }
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      let dataScore
      let totalDoctorVotes = 0
      let totalDoctorUsers = 0
      const data = await request.all()
      const doctor = await Doctor.findOrFail(data.doctor_id)
      const evaluation_doctor = await Evaluation.query()
        .where('doctor_id', data.doctor_id)
        .fetch()

      dataScore = data.score
      totalDoctorUsers = evaluation_doctor.rows.length + 1
      evaluation_doctor.rows.forEach(doctorVotes => {
        totalDoctorVotes += doctorVotes.score
      })

      const average =
        (dataScore + totalDoctorVotes) / totalDoctorUsers

      if (totalDoctorUsers > 10) {
        doctor.merge({ totalStars: average }, trx)
        await doctor.save()
        await Evaluation.create(data, trx)
        trx.commit()
        return response
          .status(200)
          .send({ success: 'Voto computado com sucesso' })
      } else {
        await Evaluation.create(data, trx)
        trx.commit()
        return response
          .status(200)
          .send({ success: 'Voto computado com sucesso' })
      }
    } catch (err) {
      console.log(err)
      await trx.rollback()
      return response
        .status(500)
        .json({ error: 'Falha interna. Tente novamente' })
    }
  }

  async update({ params, response, request }) {
    const trx = await Database.beginTransaction()
    try {
      const evaluation = await Evaluation.findOrFail(params.id)
      const data = await request.all()
      evaluation.merge(data, trx)
      await evaluation.save()
      await trx.commit()
      return evaluation
    } catch (err) {
      console.log(err)
      await trx.rollback()
      return response
        .status(500)
        .json({ error: 'Falha interna. Tente novamente' })
    }
  }

  async delete({ params, response }) {
    try {
      const evaluation = await Evaluation.findOrFail(params.id)

      await evaluation.delete()

      return response.status(200).json({ success: 'Deletado com sucesso' })
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ error: 'Falha interna. Tente novamente' })
    }
  }
}

module.exports = EvaluationController
