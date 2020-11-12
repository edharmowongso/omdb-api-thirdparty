const {
  Search,
  GetMovieByTitleOrId
} = require('./omdb_service/client')
const OMDBReqConfiguration = require('./omdb_service/requestConfiguration')

module.exports = (dep) => {
  if (!dep.fetch) {
    throw new Error('Please provide "fetch" (npm package: node-fetch) dependency.')
  }

  if (
    process.env.OMDB_API_KEY === '' ||
    process.env.OMDB_URL === ''
  ) {
    throw new Error('Please provide OMDB_API_KEY, OMDB_URL')
  }

  dep.OMDBConfiguration = new OMDBReqConfiguration(
    process.env.OMDB_API_KEY,
    process.env.OMDB_URL
  )

  return {
    Search: Search(dep),
    GetMovieByTitleOrId: GetMovieByTitleOrId(dep)
  }
}
