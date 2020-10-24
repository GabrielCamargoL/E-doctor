'use strict'

const MedicalAppointment = use("App/Models/MedicalAppointment")
const Database = use('Database')

class AppointmentController {
  async confirmedAppointments({ request, response, params }) {
    const appointments = await MedicalAppointment
      .query()
      .where('consultation_schedule', '>', Date.now())
      .andWhere('doctor_id', params.doctor_id)
      .andWhere('status', 'Accepted')
      .with('user')
      .with('doctor')
      .fetch()

    return appointments
  }

  async pendingAppointments({ request, response, params }) {
    const appointments = await MedicalAppointment
      .query()
      .where('consultation_schedule', '>', Date.now())
      .andWhere('doctor_id', params.doctor_id)
      .andWhere('status', 'Pending')
      .with('user')
      .fetch()

    return appointments
  }

  async create({ request, response, params }) {
    
    const {clinic_id, doctor_id, user_id, consultation_schedule} = request.all()

    const appointments = await MedicalAppointment.create({
      clinic_id,
      doctor_id,
      user_id,
      consultation_schedule,
    });

    return appointments
  }

  async acceptAppointment({ request, response, params }) {
    
    const {clinic_id, doctor_id, user_id, consultation_schedule} = request.all()

    const appointment = MedicalAppointment
    .query()
    .where('id', id)
    .update({ status: 'accepted' })
    
    appointment.merge({ status: 1 })

    await appointment.save()


    return appointments
  }
}


module.exports = AppointmentController
