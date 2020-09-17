'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/users', 'UserController.index').middleware('auth')

  Route.get('/users/:id', 'UserController.show')

  Route.post('/users', 'UserController.store')
    .validator('Register')

  Route.put('/users/:id', 'UserController.update')
  .middleware('auth')

  Route.delete('/users/:id', 'UserController.destroy')
  .middleware('auth')
})
  .prefix('v1/patientAuth')
  .namespace('PatientAuth')
