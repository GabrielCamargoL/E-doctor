'use strict'

const User = use("App/Models/User")
const Patient = use("App/Models/Patient")
const Database = use('Database')
const Helpers = use('Helpers')
const Hash = use('Hash')
const Drive = use('Drive');

class PatientAuth {
  async signIn({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await User.findByOrFail('email', email)

    return { token, user }
  }
}

module.exports = PatientAuth
