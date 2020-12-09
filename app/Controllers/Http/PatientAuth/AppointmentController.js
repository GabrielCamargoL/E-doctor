"use strict";

var moment = require("moment");
const MedicalAppointment = use("App/Models/MedicalAppointment");
const Doctor = use("App/Models/Doctor");
const User = use("App/Models/User");
const Database = use("Database");

const sendNotificationDoctor = async (fcmToken, detailsMessage) => {
  var serviceAccountPatient = require("../../../../edoctormedico-firebase-adminsdk-4i1ft-86bb197472.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPatient),
  });

  var message = {
    notification: {
      title: `Agenda`,
      body: `${detailsMessage}`,
    },
  };

  admin
    .messaging()
    .sendToDevice(fcmToken, message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

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

  async cancelAppointment({ request, params }) {
    try {
      const { reason } = request.all();

      const appointment = MedicalAppointment.query()
        .where("id", params.appointment_id)
        .update({ status: "Canceled", reason: reason });

      const doctor = await Doctor.findOrFail(appointment.doctor_id);

      sendNotificationDoctor(
        doctor.fcmToken,
        "Um paciente desmarcou uma consulta"
      );

      return appointment;
    } catch (err) {
      console.log("Cancel: " + err);
    }
  }
}

module.exports = AppointmentController;
