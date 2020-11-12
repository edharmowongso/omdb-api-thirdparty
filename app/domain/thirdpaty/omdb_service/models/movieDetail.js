class MovieDetail {
  constructor(data) {
    this.title = data.Title
    this.year = data.Year
    this.rated = data.Rated
    this.released = data.Released
    this.runtime = data.Runtime
    this.genre = data.Genre
    this.people = {
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      production: data.Production
    }
    this.score = {
      ratings: data.Ratings,
      metascore: data.Metascore,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes
    }
    this.plot = data.plot
    this.language = data.language
    this.country = data.Country
    this.awards = data.Awards
    this.imdbID = data.imdbID
    this.type = data.Type
    this.poster = data.Poster
    this.dvd = data.DVD
    this.boxOffice = data.BoxOffice
    this.website = data.Website
    this.response = data.Response === 'True'
  }
}

module.exports = MovieDetail
