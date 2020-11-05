'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.put('doubt/update/:id', 'DoubtController.update').middleware(['auth'])
  Route.get('doubt/show/:id', 'DoubtController.getDoubt').middleware(['auth'])
  Route.get('doubt/index', 'DoubtController.index').middleware(['auth'])
})
  .prefix('doctor')
  .namespace('DoctorAuth')
