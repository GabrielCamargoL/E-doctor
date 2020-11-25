'use strict'

const Evaluation = use("App/Models/Evaluation")
const User = use("App/Models/User")
const Doctor = use("App/Models/Doctor")
const Database = use('Database')

class EvaluationController {
  async index({ response, params}) {
    try {
      const evaluations = await Evaluation.query()
        .where('doctor_id', params.id)
        .with('user')
        .fetch()

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
}

module.exports = EvaluationController
