"use strict";

class DoctorController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onClose() {
    this.socket.broadcastToAll("drop:connection");
  }
}

module.exports = DoctorController;
