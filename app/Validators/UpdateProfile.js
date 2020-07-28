'use strict'

class UpdateProfile {
  get rules() {
    return {
      username: 'required|min:2|max:35',
      surname: 'required|min:2|max:35',
      email: 'required|email',
      celphone: 'required',
      birthday: 'required',
      genre: 'required',
      cpf: 'required|unique:users,cpf',
      zip_code: 'required|min:8',
      state: 'required',
      city: 'required',
      neighborhood: 'required',
      street: 'required',
      house_number: 'required'
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
      'surname.min': 'O sobrenome precisa ter entre 2 e 35 caracteres!',
      'surname.max': 'O sobrenome precisa ter entre 2 e 35 caracteres!',
      'email.required': 'O e-mail é obrigatório!',
      'email.email': 'E-mail invalido!',
      'cpf.required': 'O cpf é obrigatório!',
      'cpf.unique': 'Este cpf ja existe!',
      'birthday.required': 'Este campo é obrigatório!',
      'genre.required': 'Este campo é obrigatório!',
      'celphone.required': 'O telefone é obrigatório!',
      'city.required': 'A cidade é obrigatório!',
      'state.required': 'O estado é obrigatório!',
      'zip_code.required': 'O CEP é obrigatório!',
      'zip_code.min': 'Informe um CEP valido!',
      'house_number.required': 'O número é obrigatório!',
      'neighborhood.required': 'O bairro é obrigatório!',
      'street.required': 'A rua é obrigatória!'
    }
  }
}

module.exports = Update
