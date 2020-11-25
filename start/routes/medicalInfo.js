'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('create', 'MedicalInfoController.create').middleware(['auth'])
  Route.put('update', 'MedicalInfoController.update').middleware(['auth'])
  Route.get('show', 'MedicalInfoController.show').middleware(['auth'])
})
  .prefix('medicalInfo')
  .namespace('MedicalInfoController')
