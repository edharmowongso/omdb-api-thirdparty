const Logging = async (req, _, next) => {
  try {
    console.log(req)

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  APILogging: Logging
}
