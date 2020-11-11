require('dotenv').config()

const app = require('./config/express')(require('express'))
const http = require('http')
const packageJSON = require('./package')
const { log, error } = console
const { PORT: port } = process.env
const { name, version } = packageJSON

let server

/**
 * Listener server for test
 *
 * @returns {*} listen Listen
 */
const Listener = () => {
  const listen = app.listen(() => {
    let host = listen.address().address

    if (host === '::') {
      host = 'localhost'
    }

    const { port } = listen.address()

    log(`Listening at http://${host}${port === 80 ? '' : ':'}${port}`)
  })

  return listen
}

/**
 * Listener server for stage/production
 */
const RunServer = () => {
  server = http.createServer(app)
  server.listen(port, () => {
    log(`\n${name}::${port} - v${version}`)
  })

  process.on('SIGINT', () => {
    log('SIGINT signal received on ', new Date())

    // Stops the server from accepting new connections and finishes existing connections.
    server.close(function (err) {
      if (err) {
        error('Closing server on SIGINT', err)
        process.exit(1)
      } else log('Closing server on ', new Date())
    })
  })
}

module.exports = process.env.NODE_ENV === 'test' ? Listener() : RunServer()
