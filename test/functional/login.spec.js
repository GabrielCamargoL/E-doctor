'use strict'

const { test, trait } = use('Test/Suite')('Login')
const Doctor = use('App/Models/Doctor')

trait('Test/ApiClient')
trait('Auth/Client')

test('Login', async ({ client, done, auth}) => {
  const response = await client
    .post('/doctorAuth/signIn')
    .send({
      email: 'gabriel.cleite@outlook.com',
      password: '1234567'
    })
    .end()

  response.assertStatus(200)
}).timeout(0)
