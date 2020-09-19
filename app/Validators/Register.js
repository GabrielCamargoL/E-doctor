'use strict'

class Register {

  get rules() {
    return {
      username: 'required|min:2|max:35',
      surname: 'required|min:2|max:35',
      email: 'required|email|unique:users,email',
      password: 'required|min:8|max:40'
    }
  }

  // get validateAll () {
  //   return true
  // }

  get messages() {
    return {
      'username.required': 'O nome é obrigatório!',
      'username.min': 'O nome precisa ter entre 2 e 35 caracteres!',
      'username.max': 'O nome precisa ter entre 2 e 35 caracteres!',
      'surname.required': 'O sobrenome é obrigatório!',
      'surname.min': 'O sobrenome precisa te0r entre 2 e 35 caracteres!',
      'surname.max': 'O sobrenome precisa ter entre 2 e 35 caracteres!',
      'email.required': 'O e-mail é obrigatório!',
      'email.email': 'E-mail invalido!',
      'email.unique': 'Este email ja existe!',
      'password.min': 'A senha precisa ter entre 8 e 40 caracteres!',
      'password.max': 'A senha precisa ter entre 8 e 40 caracteres!',
      'password.required': 'A senha é obrigatoria!',
      'password.confirmed': 'As senhas não coicidem!'
    }
  }
}

module.exports = Register
