const { GetTime } = require('../../../lib/time')

const Logging = async (req, _, next) => {
  try {
    const currentTime = GetTime()
    const { method, originalUrl, params, query, statusCode } = req

    console.log(`${currentTime} | ${method} ${originalUrl}`)
    
    //  await ApiRequestFeed.create({
    //    method: method, 
    //    url: originalUrl
    //  })

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  APILogging: Logging
}
