const resource = require('./resource')
const service = require('./service')

/**
 * module MovieService
 * @param {*} dep is an object of dependecies required by movie services
 * @returns {*} exported functions
 */
module.exports = (dep) => {
  if (!dep.OMDBRepo) {
    throw new Error('Please provide OMDB Repo')
  }

  // inject resource to dep before func initialization
  dep.resource = resource

  const Index = service.Index(dep)
  const Show = service.Detail(dep)

  return {
    Index,
    Show,
  }
}
