module.exports = (app, express) => {
  const router = new express.Router()
  const v1 = require('./v1')(express)

  router.use('/v1', v1)
  router.use('/', v1)

  app.use(router)
}
