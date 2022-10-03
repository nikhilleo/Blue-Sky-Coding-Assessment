
const handleError = function (err, req, res, next) {
  if (err.message) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
}

const handleNotFoundError = function(req, res) {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesn't exist",
  });
}

module.exports = { 
  handleError, 
  handleNotFoundError
}