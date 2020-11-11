const { MovieUseCase } = require('../../../../container')

module.exports = (express) =>
  new express.Router()
    .get('/', MovieUseCase.Index)
    .get('/:movie_id', MovieUseCase.Show)
