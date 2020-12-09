"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.table("users", (table) => {
      table.string("fcmToken");
    });
  }

  down() {
    this.table("users", (table) => {
      table.string("fcmToken");
    });
  }
}

module.exports = UserSchema;
