const { MovieUseCase } = require('../../../../container')
const { APILogging } = require('../../../../middleware/apiLogging')

module.exports = (express) =>
  new express.Router()
    .get(
      '/', 
      APILogging,
      MovieUseCase.Index
    )
    .get(
      '/search',
      APILogging,
      MovieUseCase.Index
    )
    .get(
      '/:movie_id', 
      APILogging,
      MovieUseCase.Show
    )
    .get(
      '/detail/:movie_id',
      APILogging,
      MovieUseCase.Show
    )
