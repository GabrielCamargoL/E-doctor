"use strict";

const MedicalAppointment = use("App/Models/MedicalAppointment");
const User = use("App/Models/User");
const Database = use("Database");

class AppointmentController {
  async detailsAppointment({ params }) {
    const appointment = await MedicalAppointment.query()
      .where("id", params.appointment_id)
      .with("user", (builder) => {
        builder.with("medicalInfo");
      })
      .with("doctor")
      .with("clinic")
      .fetch();

    return appointment;
  }

  async confirmedAppointments({ request, response, auth }) {
    const user = await auth.getUser();
    const appointments = await MedicalAppointment.query()
      .where("consultation_schedule", ">", Date.now())
      .andWhere("user_id", user.id)
      .whereNot("status", "Pending")
      .with("doctor")
      .fetch();

    return appointments;
  }

  async pendingAppointments({ request, response, auth }) {
    const user = await auth.getUser();
    const appointments = await MedicalAppointment.query()
      .where("consultation_schedule", ">", Date.now())
      .andWhere("user_id", user.id)
      .andWhere("status", "Pending")
      .with("doctor")
      .fetch();

    return appointments;
  }

  async create({ request }) {
    try {
      const {
        clinic_id,
        doctor_id,
        user_id,
        consultation_schedule,
      } = request.all();

      const appointments = await MedicalAppointment.create({
        clinic_id,
        doctor_id,
        user_id,
        consultation_schedule,
      });

      return appointments;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelAppointment({ request, params }) {
    try {
      const { reason } = request.all();

      const appointment = MedicalAppointment.query()
        .where("id", params.appointment_id)
        .update({ status: "Canceled", reason: reason });

      // * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      //
      //  Notificar o usuário que o médico cancelou a consulta
      //
      // * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

      return appointment;
    } catch (err) {
      console.log("Cancel: " + err);
    }
  }

  async doneAppointment({ request, params }) {
    try {
      const appointment = MedicalAppointment.query()
        .where("id", params.appointment_id)
        .update({ status: "Done" });

      // * * * * * * * * * * * * * * * * * * * * * * * *
      //
      //  Enviar arquivo de exame PDF para o S3
      //
      //  Preparar a string de receita Médica
      //
      // * * * * * * * * * * * * * * * * * * * * * * * *

      return appointment;
    } catch (err) {
      console.log("Done: " + err);
    }
  }
}

module.exports = AppointmentController;
