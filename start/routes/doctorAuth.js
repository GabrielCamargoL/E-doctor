'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('signUp', 'DoctorController.signUp').middleware(['guest'])
  Route.post('signIn', 'DoctorController.signIn').middleware('guest')
  Route.put('update/:id', 'DoctorController.update')
  Route.get('getUser/:id', 'DoctorController.getUser')
  Route.get('index', 'DoctorController.index')
  Route.delete('delete/:id', 'DoctorController.destroy')
  Route.post('uploadPhoto/:id', 'ImageController.uploadProfilePhoto')
})
  .prefix('doctorAuth')
  .namespace('DoctorAuth')
