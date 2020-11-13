const { GetTime } = require('./time')
const { error } = console

module.exports = () => {
  return (err, req, res, next) => {
    if (!err) {
      return next
    }

    error(err)

    if (err.isJoi) {
      err.statusCode = 400
    }

    return res.status(err.statusCode || 500).json({
      time: GetTime(),
      message: err.message,
      errCode: err.errCode,
    })
  }
}
