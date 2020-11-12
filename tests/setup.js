module.exports = () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Invalid NODE_ENV')
  }
}
