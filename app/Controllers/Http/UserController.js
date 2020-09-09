'use strict'

const User = use("App/Models/User")
const Database = use('Database')
const Helpers = use('Helpers')
const Hash = use('Hash')
const Drive = use('Drive');

class UserController {
  
  // POST --------------------------------------------------------
    async store({ request }) {
      const data = request.all()
  
      const user = await User.create(data)
  
      return user
    }

    // GET --------------------------------------------------------
  async index({ request }) {
    const users = await Database.select('*').from('users')

    const user = User
      .query()
      .fetch()
    return users, user
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id)
    
    return user
  }


// PUT --------------------------------------------------------
  async update({ request }) {
    const user = await User.findOrFail(params.id)

    const { wish_list, ...data } = request.only([
      "username",
      "surname",
      "email",
      "cpf",
      "genre",
      "birthday",
      "celphone",
      "zip_code",
      "state",
      "city",
      "neighborhood",
      "public_neighborhood",
      "house_number",
      "street",
      "complement_address",
      "user_updated",
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
