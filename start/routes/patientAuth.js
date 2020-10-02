'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/users', 'UserController.index').middleware('auth')

  Route.get('/users/:id', 'UserController.show')

  Route.post('signUp', 'UserController.signUp').middleware(['guest'])
    //.validator('Register')
  Route.post('signIn', 'PatientAuth.signIn').middleware(['guest'])

  Route.put('/users/:id', 'UserController.update')
  .middleware('auth')

  Route.delete('/users/:id', 'UserController.destroy')
  .middleware('auth')
})
  .prefix('patientAuth')
  .namespace('PatientAuth')
