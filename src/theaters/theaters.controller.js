const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//----functions----//
//Lists all the thaters
async function list(req, res) {
  res.json({ data: await theatersService.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
