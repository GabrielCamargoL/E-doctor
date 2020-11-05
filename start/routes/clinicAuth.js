'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('create/:id', 'ClinicController.create')
  Route.put('update/:id', 'ClinicController.update')
  Route.get('getClinic/:id', 'ClinicController.getClinic')
  Route.get('index', 'ClinicController.index')
  Route.delete('delete/:id', 'ClinicController.destroy')
  //Route.post('uploadPhoto/:id', 'ImageController.uploadProfilePhoto')
})
  .prefix('clinicAuth')
  .namespace('ClinicAuth')
