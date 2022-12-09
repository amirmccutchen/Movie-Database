const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// Lists all of the theaters
async function list(req, res, next) {
    const data = await theatersService.list();
    res.send({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
}