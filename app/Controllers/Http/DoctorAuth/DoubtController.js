"use strict";

var admin = require("firebase-admin");
const Doubt = use("App/Models/Doubt");
const User = use("App/Models/User");
const Doctor = use("App/Models/Doctor");
const Database = use("Database");

const sendOneNotification = async (fcmToken, doctor, detailsMessage) => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });

  var message = {
    notification: {
      title: `${doctor.username} ${doctor.surname} - ${doctor.specialty} `,
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

class DoubtController {
  async update({ request, response, params }) {
    const trx = await Database.beginTransaction();
    try {
      const doubt = await Doubt.findOrFail(params.id);
      const data = request.all();
      doubt.merge(data);
      await doubt.save(trx);
      await trx.commit();

      const user = await User.findOrFail(doubt.user_id);
      const doctor = await Doctor.findOrFail(doubt.doctor_id);

      sendOneNotification(user.fcmToken, doctor, "Respondeu sua dúvida");

      return response.status(200).send(doubt);
    } catch (error) {
      console.log(error);
      await trx.rollback();
      return response.status(error.status).send(error);
    }
  }

  async index({ response, auth }) {
    try {
      const user = await auth.getUser();
      const doubt = await Doubt.query()
        .where("user_id", user.id)
        .with("user")
        .with("doctor")
        .fetch();

      return response.status(200).send(doubt);
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error);
    }
  }

  async getDoubt({ response, params }) {
    try {
      const doubt = await Doubt.query()
        .where("id", "=", params.id)
        .with("doctor")
        .with("user")
        .first();
      return response.status(200).send(doubt);
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(error);
    }
  }
}

module.exports = DoubtController;
