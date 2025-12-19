const appService = (req, res) => {
  res.status(200).send("API REST Contact Directory");
};

module.exports = {
  appService,
};
