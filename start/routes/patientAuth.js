'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/users', 'UserController.index').middleware('auth')

  Route.get('/getUser', 'UserController.getUser').middleware('auth')

  Route.post('/signUp', 'UserController.signUp')
  Route.post('/signIn', 'PatientAuth.signIn')

    //.validator('Register')

  Route.put('/users/:id', 'UserController.update')
  .middleware('auth')

  Route.delete('/users/:id', 'UserController.destroy')
  .middleware('auth')

  Route.post('uploadPhoto/:id', 'ImageController.uploadProfilePhoto')
  Route.post('uploadSelfie/:id', 'ImageController.uploadSelfie')

  Route.post('doubt/create', 'DoubtController.create').middleware(['auth'])
  Route.get('doubt/show/:id', 'DoubtController.getDoubt').middleware(['auth'])
  Route.get('doubt/index', 'DoubtController.index').middleware(['auth'])

  Route.get('confirmedAppointments', 'AppointmentController.confirmedAppointments').middleware(['auth'])
  Route.get('pendingAppointments', 'AppointmentController.pendingAppointments').middleware(['auth'])
  Route.put('cancel/:appointment_id', 'AppointmentController.cancelAppointment').middleware(['auth'])

  Route.post('evaluation', 'EvaluationController.store')

})
  .prefix('patientAuth')
  .namespace('PatientAuth')
