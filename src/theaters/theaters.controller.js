const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// lists all theaters

async function list(req, res) {
  res.json({ data: await theatersService.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
