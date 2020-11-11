'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('create', 'AppointmentController.create')

  Route.get('confirmedAppointments/:doctor_id', 'AppointmentController.confirmedAppointments')
  Route.get('pendingAppointments/:doctor_id', 'AppointmentController.pendingAppointments')
  Route.get('details/:appointment_id', 'AppointmentController.detailsAppointment')

  Route.put('accept/:appointment_id', 'AppointmentController.acceptAppointment')
  Route.put('reject/:appointment_id', 'AppointmentController.rejectAppointment')
  Route.put('cancel/:appointment_id', 'AppointmentController.cancelAppointment')
  Route.put('done/:appointment_id', 'AppointmentController.doneAppointment')
})
  .prefix('appointment')
  .namespace('Appointment')
