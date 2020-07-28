'use strict'

class Password {
  get rules() {
    return {
      password: 'required|min:8|max:40|confirmed'
    }
  }

  get messages() {
    return {
      'password.min': 'A senha precisa ter entre 8 e 40 caracteres!',
      'password.max': 'A senha precisa ter entre 8 e 40 caracteres!',
      'password.required': 'A senha é obrigatoria!',
      'password.confirmed': 'As senhas não coincidem!',
      'password.different': 'A nova senha precisa ser diferente da antiga!',
    }
  }
}

module.exports = Password