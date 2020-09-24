'use strict'

const Doctor = use("App/Models/Doctor")
const Drive = use('Drive');


class ImageController {
  async uploadProfilePhoto({ request, params }) {
    try {
      const doctor = await Doctor.findOrFail(params.id)
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

        doctor.path_avatar = url;
        doctor.save();
      })

      // You must call this to start processing uploaded file
      await request.multipart.process()

      return true;
    } catch (err) {
      console.log('Deu ruim nessa caralha', err);
      return false;
    }
  }
}

module.exports = ImageController
