const {
  Search
} = require('./omdb_service/client')

module.exports = (dep) => {
  if (!dep.fetch) {
    throw new Error('Please provide "fetch" (npm package: node-fetch) dependency.')
  }

  if (process.env.OMDB_API_KEY === '') {
    throw new Error('Please provide OMDB_API_KEY.')
  }

  return {
    Search: Search(dep)
  }
}
