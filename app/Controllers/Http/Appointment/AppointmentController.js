"use strict";

const MedicalAppointment = use("App/Models/MedicalAppointment");
const Medicine = use("App/Models/Medicine");
const User = use("App/Models/User");
const Database = use("Database");
const Ws = use("Ws");

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

  async confirmedAppointments({ request, response, params }) {
    const appointments = await MedicalAppointment.query()
      .where("consultation_schedule", ">", Date.now())
      .andWhere("doctor_id", params.doctor_id)
      .andWhere("status", "Accepted")
      .with("user")
      .with("doctor")
      .fetch();

    return appointments;
  }

  async pendingAppointments({ request, response, params }) {
    const appointments = await MedicalAppointment.query()
      .where("consultation_schedule", ">", Date.now())
      .andWhere("doctor_id", params.doctor_id)
      .andWhere("status", "Pending")
      .with("user")
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

  async acceptAppointment({ request, params }) {
    try {
      const appointment = await MedicalAppointment.query()
        .where("id", params.appointment_id)
        .first();

      const data = {
        status: "Accepted",
      };

      appointment.merge(data);
      await appointment.save();

      //  Notificar o usuário que o médico Aceitou a consulta
      const userTopic = Ws.getChannel("user:*").topic(
        `user:${appointment.user_id}`
      );
      if (userTopic)
        userTopic.broadcast("update:appointment", appointment.status);

      return appointment;
    } catch (err) {
      console.log("Done: " + err);
    }
  }

  async rejectAppointment({ request, params }) {
    try {
      const appointment = await MedicalAppointment.query()
        .where("id", params.appointment_id)
        .first();

      const data = {
        status: "Rejected",
      };

      appointment.merge(data);
      await appointment.save();

      //  Notificar o usuário que o médico Rejeitou a consulta
      const userTopic = Ws.getChannel("user:*").topic(
        `user:${appointment.user_id}`
      );
      if (userTopic)
        userTopic.broadcast("update:appointment", appointment.status);

      return appointment;
    } catch (err) {
      console.log("Reject: " + err);
    }
  }

  async cancelAppointment({ request, params }) {
    try {
      const { reason } = request.all();

      const appointment = MedicalAppointment.query()
        .where("id", params.appointment_id)
        .update({ status: "Canceled", reason: reason });

      return appointment;
    } catch (err) {
      console.log("Cancel: " + err);
    }
  }

  async doneAppointment({ request, params }) {
    try {
      const { medicines } = request.all();

      const appointment = await MedicalAppointment.query()
        .where("id", params.appointment_id)
        .update({ status: "Done" });

      medicines.map((item, index) => {
        Medicine.create({
          medical_appointment_id: params.appointment_id,
          name: item.name,
          period_type: item.period_type,
          hours: item.period,
          days: item.days,
        });
        console.log(item);
      });

      return appointment;
    } catch (err) {
      console.log("Done: " + err);
    }
  }
}

module.exports = AppointmentController;
