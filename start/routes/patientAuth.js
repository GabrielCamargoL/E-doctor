'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/users', 'UserController.index').middleware('auth')

  Route.get('/getUser', 'UserController.getUser').middleware('auth')

  Route.post('/users', 'UserController.signUp')
  Route.post('/signIn', 'PatientAuth.signIn')

    //.validator('Register')

  Route.put('/users/:id', 'UserController.update')
  .middleware('auth')

  Route.delete('/users/:id', 'UserController.destroy')
  .middleware('auth')

  Route.post('doubt/create', 'DoubtController.create').middleware(['auth'])
  Route.get('doubt/show/:id', 'DoubtController.getDoubt').middleware(['auth'])
  Route.get('doubt/index', 'DoubtController.index').middleware(['auth'])

})
  .prefix('patientAuth')
  .namespace('PatientAuth')
