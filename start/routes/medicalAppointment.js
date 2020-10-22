'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('create', 'AppointmentController.create').middleware(['guest'])
  Route.get('confirmedAppointments/:doctor_id', 'AppointmentController.confirmedAppointments')
  Route.get('pendingAppointments/:doctor_id', 'AppointmentController.pendingAppointments')
})
  .prefix('appointment')
  .namespace('Appointment')
