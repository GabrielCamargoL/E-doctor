'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

})
  .prefix('v1/evaluation')
  .namespace('EvaluationController')
