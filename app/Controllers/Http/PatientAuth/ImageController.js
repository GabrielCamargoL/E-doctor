'use strict'

const User = use("App/Models/User")
const Drive = use('Drive');


class ImageController {
  async uploadProfilePhoto({ response, request, auth }) {
    try {
      const userAuth = await auth.getUser()
      const user = await User.findOrFail(userAuth.id)

      let url
      request.multipart.file('image', {}, async file => {
        const ContentType = file.headers['content-type']
        const name = `${Date.now()}-${file.clientName}`;
        const ACL = 'public-read'
        const Key = `${name}.${file.subtype}`

        const Url = await Drive.put(`tmp/${Key}`, file.stream, {
          ContentType,
          ACL
        })
        url = Url
      })
      await request.multipart.process()
      user.path_avatar = url;
      await user.save();

      if (url) return response.status(200).send(url)
      else return response.status(500).send('Algo inesperado aconteceu!')
    } catch (err) {
      console.log('Deu ruim nessa caralha', err);
      return response.status(error.status).send(error)
    }
  }
}

module.exports = ImageController
