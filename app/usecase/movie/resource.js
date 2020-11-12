const Joi = require('@hapi/joi')

const ValidateSearchInput = (query) =>
  Joi
    .object({
      q: Joi.string().required(),
      type: Joi.string().valid('movie', 'series', 'episode').optional().default(''),
      year: Joi.string().optional().default(''),
      page: Joi.number().min(1).max(100).default(1)
    })
    .validateAsync(query, { stripUnknown: true })

const ValidateMovieDetailInput = (query) =>
  Joi
    .object({
      search_by: Joi.string().valid('id', 'title').required(),
      type: Joi.string().valid('movie', 'series', 'episode').optional().default(''),
      year: Joi.string().optional().default(''),
      plot: Joi.string().valid('short', 'full').optional().default('')
    })
    .validateAsync(query, { stripUnknown: true })

const ValidateMovieId = (query) =>
  Joi
    .object({
      movie_id: Joi.string().required()
    })
    .validateAsync(query, { stripUnknown: true })

module.exports = {
  ValidateSearchInput,
  ValidateMovieDetailInput,
  ValidateMovieId
}
