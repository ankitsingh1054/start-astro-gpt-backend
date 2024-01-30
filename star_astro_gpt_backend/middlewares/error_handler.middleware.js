module.exports = (err, req, res) => {
  console.error(err.error);
  res.status(err.status).send({message: err.message, error: err.error.message});
};
