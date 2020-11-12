class RequestConfiguration {
  constructor(apikey, url) {
    this.key = apikey
    this.url = url
  }

  generateHeaderRequest() {
    return {
      'Content-Type': 'application/json',
    }
  }

  GenerateSearchRequest(params) {
    const { q, type, year, page } = params

    return {
      path: `${this.url}?apikey=${this.key}&s=${q}&type=${type}&y=${year}&page=${page}`,
      method: 'GET',
      headers: this.generateHeaderRequest(),
    }
  }

  GenerateGetMovieDetailRequest(movie_id, params) {
    const { search_by, type, year, plot } = params
    let additionalQuery = ''

    if (search_by === 'id') {
      additionalQuery += `i=${movie_id}`
    } else {
      additionalQuery += `t=${movie_id}`
    }

    return {
      path: `${this.url}?apikey=${this.key}&${additionalQuery}&type=${type}&y=${year}&plot=${plot}`,
      method: 'GET',
      headers: this.generateHeaderRequest(),
    }
  }
}

module.exports = RequestConfiguration
