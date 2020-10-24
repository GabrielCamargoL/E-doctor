'use strict'

const MedicalInfo = use('App/Models/MedicalInfo')
class MedicalInfoController {
  /**
   * Show a list of all medicalinfos.
   * GET medicalinfos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
  }

  async create ({ request, response, params }) {
    const {
      weight,
      height,
      blood_type,
      health_problems,
      allergy,
      personal_medicine,
    } = request.all()

    const medicalinfo = await MedicalInfo.create({
      user_id: params.pacient_id,
      weight,
      height,
      blood_type,
      health_problems,
      allergy,
      personal_medicine
    })

    return medicalinfo
  }

  /**
   * Create/save a new medicalinfo.
   * POST medicalinfos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single medicalinfo.
   * GET medicalinfos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing medicalinfo.
   * GET medicalinfos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update medicalinfo details.
   * PUT or PATCH medicalinfos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a medicalinfo with id.
   * DELETE medicalinfos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MedicalInfoController
