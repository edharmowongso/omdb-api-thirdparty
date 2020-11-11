const Index = (dep) => async (req, res, next) => {
  try {
    const { OMDBRepo, resource } = dep

    return res.json({ a: 1 })
  } catch (err) {
    return next(err)
  }
}

const Detail = (dep) => async (req, res, next) => {
  try {
    const { OMDBRepo, resource } = dep

    return res.json({ a: 2 })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  Index,
  Detail
}
