const fs = require('fs')
const path = require('path')

fs.readdirSync(`${__dirname}/`).forEach(file => {
  const extname = path.extname(file)
  const basename = path.basename(file, extname)

  if (file.indexOf('.mocha.js') >= 0 && basename !== 'index') {
    require(`./${basename}`)
  }
})
