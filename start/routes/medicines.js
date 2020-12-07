'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('show/:appointment_id', 'MedicineController.show').middleware(['auth'])
})
  .prefix('prescription')
  .namespace('MedicineController')
