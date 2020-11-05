'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('create', 'DoubtController.create').middleware(['auth'])
  Route.get('show/:id', 'DoubtController.getDoubt').middleware(['auth'])
  Route.get('index', 'DoubtController.index').middleware(['auth'])
})
  .prefix('doubt')
  .namespace('DoubtController')
