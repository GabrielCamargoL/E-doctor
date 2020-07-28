'use strict'

class Login {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  // get validateAll () {
  //   return true
  // }

  get messages() {
    return {
      'email.required': 'O e-mail é obrigatório!',
      'email.email': 'E-mail invalido!',
      'password.required': 'A senha é obrigatória!',
    }
  }
}

module.exports = Login
