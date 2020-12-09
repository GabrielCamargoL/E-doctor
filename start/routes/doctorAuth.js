'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('signUp', 'DoctorController.signUp').middleware(['guest'])
  Route.post('signIn', 'DoctorController.signIn').middleware('guest')
  Route.post('uploadPhoto/:id', 'ImageController.uploadProfilePhoto')

  Route.get('getUser/:id', 'DoctorController.getUser')
  Route.get('index', 'DoctorController.index')

  Route.put('update/:id', 'DoctorController.update')
  Route.put('update/available_hours/:id', 'DoctorController.updateAvailableHours')
  Route.put('fcmToken/:id', 'DoctorController.updateFcmToken').middleware(["auth"]);

  Route.delete('delete/:id', 'DoctorController.destroy')
})
  .prefix('doctorAuth')
  .namespace('DoctorAuth')

  