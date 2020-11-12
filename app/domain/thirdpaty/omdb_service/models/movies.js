class Movies {
  constructor(responses) {
    this.data = responses.Search.map(response => {
      return {
        title: response.Title,
        year: response.Year,
        imdbID: response.imdbID,
        type: response.Type,
        poster: response.Poster
      }
    })
    this.total = Number(responses.totalResults)
    this.response = responses.Response === 'True'
  }
}

module.exports = Movies
