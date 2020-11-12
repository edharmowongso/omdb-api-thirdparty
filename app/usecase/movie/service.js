const Index = (dep) => async (req, res, next) => {
  try {
    const { OMDBRepo, resource } = dep
    const { q, type, year, page } = await resource.ValidateSearchInput(req.query)
    const response = await OMDBRepo.Search({ q, type, year, page })

    return res.json(response)
  } catch (err) {
    return next(err)
  }
}

const Detail = (dep) => async (req, res, next) => {
  try {
    const { OMDBRepo, resource } = dep
    const [{ movie_id }, sanitizedQuery] = await Promise.all([
      resource.ValidateMovieId(req.params),
      resource.ValidateMovieDetailInput(req.query)
    ])
    const response = await OMDBRepo.GetMovieByTitleOrId(movie_id, sanitizedQuery)

    return res.json(response)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  Index,
  Detail
}
