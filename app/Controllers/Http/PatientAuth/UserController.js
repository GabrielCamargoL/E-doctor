'use strict'

const User = use("App/Models/User")
const Database = use('Database')
const Helpers = use('Helpers')
const Hash = use('Hash')
const Drive = use('Drive');

class UserController {

  // POST --------------------------------------------------------
    async signUp({ request, response, auth }) {
      const trx = await Database.beginTransaction()
      try {
        const { email, password, ...data } = request.all()
        const user = await User.create({ email, password, ...data }, trx)

        await trx.commit()
        const token = await auth.withRefreshToken().attempt(email, password)

        return response.status(200).send(token)
      } catch (error) {
        console.log(error);
        await trx.rollback()
        return response.status(error.status).send(error)
      }
    }

    // GET --------------------------------------------------------
  async index({ request }) {
    const users = await Database.select('*').from('users')

    const user = User
      .query()
      .fetch()
    return users, user
  }


  async getUser({ response, auth }) {
    try {
      const user = await auth.getUser()

      const patient = await User.query()
        .where('id', user.id)
        .first()

      const data = Object.assign(patient, { email: user.email })

      return response.status(200).send(data)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }


// PUT --------------------------------------------------------
  async update({ request, params }) {
    const user = await User.findOrFail(params.id)

    const data = request.only([
      'username',
      'surname',
      'email',
      'password',
      'cpf',
      'genre',
      'birthday',
      'phone',
      'zip_code',
      'house_number',
      'complement_address',
      'state',
      'city',
      'neighborhood',
      'street',
    ])


    user.merge(data)

    await user.save()

    return user
  }

  async updatePassword({ params, request, response }) {
    const { currentPassword } = request.all()

    const user = await User.findOrFail(params.id)
    const userPassword = user.$attributes.password

    const isSame = await Hash.verify(currentPassword, userPassword)

    if (isSame) {
      const { wish_list, ...data } = request.only([
        "password",
      ])

      user.merge(data)

      await user.save()

      return user
    } else {
      return response.status(400).json({ error: 'A senha antiga esta incorreta!' })
    }
  }

  async uploadProfilePhoto({ request, params }) {
    try {
      const user = await User.findOrFail(params.id)
      const validationOptions = {
        types: ['jpeg', 'jpg', 'png'],
        size: '20mb'
      }

      request.multipart.file('photo', validationOptions, async file => {
        // set file size from stream byteCount, so adonis can validate file size
        file.size = file.stream.byteCount

        // run validation rules
        await file.runValidations()

        // catches validation errors, if any and then throw exception
        const error = file.error()
        if (error.message) {
          throw new Error(error.message)
        }

        const name = `${Date.now()}-${file.clientName}`;

        // upload file to s3
        const url = await Drive.put(`tmp/${name}`, file.stream, {
          ContentType: file.headers['content-type'],
          ACL: 'public-read'
        })

        user.path = url;
        user.save();
      })

      // You must call this to start processing uploaded file
      await request.multipart.process()

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


// DELETE --------------------------------------------------------
  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return 'usuário deletado com sucesso'
  }

  async delete({ request }) {

  }
}

module.exports = UserController
