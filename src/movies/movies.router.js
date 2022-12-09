const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");
const cors = require("cors");

// router.use(cors());

// Checks for a specific movie in theaters
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
// Checks for a specific movie in reviews
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

// Views a movie
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

// Views all movies
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
