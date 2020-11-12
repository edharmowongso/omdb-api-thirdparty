require('dotenv').config()

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { mockReq, mockRes } = require('sinon-express-mock')
const forEach = require('mocha-each')
const expect = chai.expect

chai.use(sinonChai)

describe('OMDB Third Party test', function () {})
