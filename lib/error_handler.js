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
      time: new Intl.DateTimeFormat(['en'], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timezone: 'Asia/Jakarta',
        timezoneName: 'short',
      }).format(new Date()),
      message: err.message,
      errCode: err.errCode,
    })
  }
}
