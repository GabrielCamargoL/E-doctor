import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

var topicName = "edoctor";

var message = {
  notification: {
    title: "TITULO",
    body: "Corpo da menssagem",
  },
  android: {
    notification: {
      icon: "stock_ticker_update",
      color: "#7e55c3",
    },
  },
  topic: topicName,
};

admin
  .messaging()
  .send(message)
  .then((response) => {
    console.log("Deu certo", response);
  })
  .catch((error) => {
    console.log("Deu errado", error);
  });
