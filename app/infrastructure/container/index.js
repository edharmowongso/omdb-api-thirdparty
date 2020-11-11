const OMDBRepo = require('../../domain/thirdpaty/omdb')({
  fetch: require('node-fetch'),
})

const MovieUseCase = require('../../usecase/movie')({
  OMDBRepo
})

module.exports = {
  MovieUseCase
}
