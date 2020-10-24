'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('create/:pacient_id', 'MedicalInfoController.create').middleware(['auth'])
})
  .prefix('medicalInfo')
  .namespace('MedicalInfoController')
