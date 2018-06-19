const auth = (req, res, next) => {
  const token = req.query.token || req.headers['authorization'];
  if (token == 'false') {
    res.status(401).send({
      error: true,
      message: 'Sorry. You might not be authorized.',
      status: 'error'
    });
  } else {
    return next();
  }
};

module.exports = auth;
