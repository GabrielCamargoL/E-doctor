'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'API E-Doctor - Status: Online' }
})

// Capturando as rotas de Usuário e sessão
Route.get('/users', 'UserController.index').middleware('auth')

Route.get('/users/:id', 'UserController.show')

Route.post('/users', 'UserController.store')
  .validator('Register')

Route.put('/users/:id', 'UserController.update')
  .middleware('auth')
  .validator('Update')

Route.put('/passwords/:id', 'UserController.updatePassword')
  .middleware('auth')
  .validator('Password')

Route.delete('/users/:id', 'UserController.destroy')
  .middleware('auth')

Route.post('/sessions', 'SessionController.create')
  .validator('Login')

// editar Senha
Route.post('/recover-password', 'RecoverPasswordController.store');
Route.get('/recover-password/:id', 'RecoverPasswordController.show');
Route.put('/recover-password/:token', 'RecoverPasswordController.update');


// notificações
Route.get('/notify', 'NotifyController.index').middleware('auth');
Route.get('/notify/:id', 'NotifyController.show').middleware('auth');
Route.get('/notify/:id/unvisible', 'NotifyController.getUnVisibleNotifications').middleware('auth');
Route.post('/notify', 'NotifyController.store').middleware('auth');
Route.put('/notify/:id', 'NotifyController.updateVisibleNotify').middleware('auth');

