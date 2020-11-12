require('dotenv').config()

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { mockReq, mockRes } = require('sinon-express-mock')
const forEach = require('mocha-each')
const expect = chai.expect

chai.use(sinonChai)

const moviesJsonResp = require('../seeder/movies.json')
const movieDetailJsonResp = require('../seeder/movieDetail.json')

describe('Movie usecase test', function () {
  const OMDBRepo = {
    Search: sinon.stub(),
    GetMovieByTitleOrId: sinon.stub()
  }
  const MovieUseCase = require('../../app/usecase/movie')({ OMDBRepo })

  let res, next

  beforeEach(function () {
    res = mockRes()
    next = sinon.stub()
  })

  describe('Index test', function () {
    describe('Validation failed', function () {
      forEach([
        [
          "not sending 'q' attr in query params",
          {},
          `"q" is required`
        ],
        [
          "sending invalid data type of 'q' attr in query params",
          { query: { q: 123 } },
          `"q" must be a string`
        ],
        [
          "sending invalid 'type' attr in query params",
          { query: { q: 'Guardians', type: 'video' } },
          `"type" must be one of [movie, series, episode]`
        ],
        [
          "sending invalid data type of 'year' attr in query params",
          { query: { q: 'Guardians', year: 123 } },
          `"year" must be a string`
        ],
        [
          "sending invalid data type of 'page' attr in query params",
          { query: { q: 'Guardians', page: 0 } },
          `"page" must be larger than or equal to 1`
        ],
        [
          "sending invalid data type of 'page' attr in query params",
          { query: { q: 'Guardians', page: 101 } },
          `"page" must be less than or equal to 100`
        ],
      ]).it('throws error if `%s`', async (_, params, msg) => {
        const req = mockReq(params)

        await MovieUseCase.Index(req, res, next)

        expect(next.lastCall.args[0].message).eq(msg)
      })
    })

    describe('Validation passed', function () {
      it('return expected data', async function () {
        let req = mockReq({
          query: { q: 'Guardians' }
        })

        OMDBRepo.Search.returns(
          Promise.resolve(moviesJsonResp)
        )

        await MovieUseCase.Index(req, res, next)

        const response = res.json.lastCall.args[0]

        expect(response.data.length).equal(10)
        expect(response.total).equal(175)
      })
    })
  })

  describe('Detail test', function () {
    describe('Validation failed', function () {
      forEach([
        [
          "not sending 'movie_id' attr in params",
          {},
          `"movie_id" is required`
        ],
        [
          "sending invalid data type of 'movie_id' attr in params",
          { params: { movie_id: 123 } },
          `"movie_id" must be a string`
        ],
        [
          "sending invalid 'search_by' attr in query params",
          { 
            params: { movie_id: 'tt3896198' }, 
            query: { search_by: 'i' } 
          },
          `"search_by" must be one of [id, title]`
        ],
        [
          "sending invalid 'plot' attr in query params",
          {
            params: { movie_id: 'tt3896198' },
            query: { search_by: 'id', plot: 's' }
          },
          `"plot" must be one of [short, full]`
        ],
      ]).it('throws error if `%s`', async (_, params, msg) => {
        const req = mockReq(params)

        await MovieUseCase.Show(req, res, next)

        expect(next.lastCall.args[0].message).eq(msg)
      })
    })

    describe('Validation passed', function () {
      it('return expected data', async function () {
        let req = mockReq({
          params: { movie_id: 'tt3896198' },
          query: { search_by: 'id' }
        })

        OMDBRepo.GetMovieByTitleOrId.returns(
          Promise.resolve(movieDetailJsonResp)
        )

        await MovieUseCase.Show(req, res, next)

        const response = res.json.lastCall.args[0]

        expect(response.title).equal(movieDetailJsonResp.title)
      })
    })
  })
})
