require('dotenv').config()

const mockery = require('mockery')
mockery.enable({
  warnOnUnregistered: false,
  warnOnReplace: false
})

describe('OMDB Project', function () {
  describe('UseCase', function () {
    require('./usecase')
  })

  describe('ThirdParties', function () {
    require('./thirdparties')
  })

  after(async function () {
    mockery.deregisterAll()
  })
})