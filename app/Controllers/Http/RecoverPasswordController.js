'use strict'

const Mail = use('Mail');
const Env = use('Env')
const RecoverPassword = use("App/Models/RecoverPassword");
const User = use("App/Models/User");
const moment = require("moment");

class RecoverPasswordController {
  async store ({ request, response }) {
    const { email } = request.only([
      'email'
    ]);

    const user = await User.findBy('email', email);

    if(user) {
      const recoverPassword = await RecoverPassword.create({ user_id: user.id });

      try {
        await Mail.send('recover_password', recoverPassword.toJSON(), (message) => {
          message
            .to(`${user.email}`)
            .from(`${Env.get('MAIL_USERNAME')}`)
            .subject('Recuperação de senha')
        });

        return recoverPassword;
      } catch (err) {
        return response.status(500).json({ message: 'Serviço de e-mail temporáriamente indisponível, tente novamente mais tarde.' });
      }
    } else {
      return response.status(404).json({ message: 'Email não encontrado.' });
    }
  }

  async show ({ params }) {
    const user_id = params.id;

    const recoverPassword = await RecoverPassword.query().where('user_id', user_id).fetch();

    return recoverPassword;
  }

  async update ({ params, request, response }) {
    const token = params.token;
    const data = request.only([
      'password'
    ])

    const today = moment().format('YYYY-MM-DD kk:mm:ss');
    const expiration_token = moment().subtract(1, 'days').format('YYYY-MM-DD kk:mm:ss');

    const recoverPassword = await RecoverPassword.query().where('token', token).andWhere('status', 1).whereBetween('created_at', [expiration_token, today]).first();

    if(recoverPassword) {
      const user = await User.find(recoverPassword.user_id);

      user.merge(data);

      const userStatus = await user.save();

      if(userStatus) {
        recoverPassword.merge({ status: 0 });

        const recoverStatus = await recoverPassword.save();

        if(recoverStatus) {
          return recoverPassword;
        } else {
          return response.status(500).json({ message: 'Erro ao invalidar o token.' });
        }
      } else {
        return response.status(500).json({ message: 'Erro ao trocar a senha do usuário.' });
      }
    } else {
      return response.status(404).json({ message: 'Token não encontrado ou expirado.' });
    }
  }
}

module.exports = RecoverPasswordController