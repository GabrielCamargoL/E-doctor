'use strict'

const Doctor = use("App/Models/Doctor")
const Drive = use('Drive');


class ImageController {
  async uploadProfilePhoto({ request, params }) {
    console.log('0')
    try {
      const doctor = await Doctor.findOrFail(params.id)
      const validationOptions = {
        types: ['jpeg', 'jpg', 'png'],
        size: '20mb'
      }
      console.log('1.5')

      await request.multipart.file('image', validationOptions, async file => {
        // set file size from stream byteCount, so adonis can validate file size
        file.size = file.stream.byteCount
        console.log('1')

        // run validation rules
        await file.runValidations()

        console.log('2')
        // catches validation errors, if any and then throw exception
        const error = file.error()
        if (error.message) {
          throw new Error(error.message)
        }
        console.log('3')

        const name = `${Date.now()}-${file.clientName}`;
        console.log('4')

        // upload file to s3
        const url = await Drive.put(`tmp/${name}`, file.stream, {
          ContentType: file.headers['content-type'],
          ACL: 'public-read'
        })
        console.log('5')

        doctor.path_avatar = url;
        doctor.save();
      })
      .process()


      return true;
    } catch (err) {
      console.log('Deu ruim nessa caralha', err);
      return false;
    }
  }
}

module.exports = ImageController
