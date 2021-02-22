export const createFilter = async (req, res, next) => {
  if ('id' in req.body) {
    req.filter = { id: req.body.id }
  } else {
    req.filter = {}
  }
  next()
} // Middleware for adding data filter to update and remove calls

export const notFound = (req, res, next) => {
  let err = new Error('Missing data or Wrong API Call')
  err.statusCode = 404
  const apiRegex = /\/api\/?/g
  if (!apiRegex.test(req.path)) {
    err.shouldRedirect = true
  }
  next(err)
} // Middleware for notFound
