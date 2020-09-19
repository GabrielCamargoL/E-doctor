'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.put('/passwords/:id', 'UserController.updatePassword')
  .middleware('auth')
  .validator('Password')

  Route.post('/recover-password', 'RecoverPasswordController.store');
  Route.get('/recover-password/:id', 'RecoverPasswordController.show');
  Route.put('/recover-password/:token', 'RecoverPasswordController.update');
})
  .prefix('v1/rocoverPassword')
  .namespace('RocoverPassword')
