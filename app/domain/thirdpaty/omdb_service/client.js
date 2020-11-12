const { log, error } = console
const {
  Movies,
  MovieDetail
} = require('./models')

const fetchingData = async (fetch, request) => {
  const uri = request.path.trim()
  const paramsBuilder = {
    method: request.method,
    headers: request.headers,
  }
  let body = {}
  const response = { status: 200, statusText: 'OK', data: {} }

  if (request.body) {
    paramsBuilder.body = request.body
  }

  try {
    log(`(OMDB) Request URL: ${uri}`)

    body = await fetch(uri, paramsBuilder)
    response.data = await body.json()
  } catch (error) {
    error(`(OMDB) Error Fecthing Data: ${JSON.stringify(error)}`)
  } finally {
    response.status = Number(body.status)
    response.statusText = body.statusText
  }

  return response
}

const constructErrorMessage = (response) => {
  if (!response || response.Response === 'False' || response.status >= 400) {
    const errMessage = response.Error

    log(`(OMDB) Error Response Body: ${JSON.stringify(errMessage)}`)

    const error = new Error(errMessage)
    error.statusCode = 422

    throw error
  }
}

const Search = (dep) => async (input) => {
  const { fetch, OMDBConfiguration } = dep
  const request = OMDBConfiguration.GenerateSearchRequest(input)
  const response = await fetchingData(fetch, request)

  constructErrorMessage(response.data)

  const data = new Movies(response.data)

  return data
}

const GetMovieByTitleOrId = (dep) => async (movie_id, input) => {
  const { fetch, OMDBConfiguration } = dep
  const request = OMDBConfiguration.GenerateGetMovieDetailRequest(movie_id, input)
  const response = await fetchingData(fetch, request)

  constructErrorMessage(response.data)

  const data = new MovieDetail(response.data)

  return data
}

module.exports = {
  Search,
  GetMovieByTitleOrId
}
