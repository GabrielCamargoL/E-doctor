"use strict";

class UserController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }

  onClose() {
    this.socket.broadcastToAll("drop:connection");
  }
}

module.exports = UserController;
