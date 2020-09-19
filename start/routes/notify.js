'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/notify', 'NotifyController.index').middleware('auth');
  Route.get('/notify/:id', 'NotifyController.show').middleware('auth');
  Route.get('/notify/:id/unvisible', 'NotifyController.getUnVisibleNotifications').middleware('auth');
  Route.post('/notify', 'NotifyController.store').middleware('auth');
  Route.put('/notify/:id', 'NotifyController.updateVisibleNotify').middleware('auth');
})
  .prefix('v1/notify')
  .namespace('NotifyController')
