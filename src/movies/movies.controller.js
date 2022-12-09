const moviesService = require("../movies/movies.service");

const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// Checks if movie exists
async function movieExists(req, res, next) {
	const { movieId } = req.params;
	const movie = await moviesService.read(movieId);
	if (movie) {
		res.locals.movie = movie;
		res.locals.movieId = movieId;
		return next();
	}
	return next({
		status: 404,
		message: `A movie with the ID of ${movieId} cannot be found.`,
	});
}

// Lists all of the movies
async function list(req, res, next) {
	const { is_showing } = req.query;
	if (is_showing) {
		const movieList = await moviesService.listShowingMovies(true);
		res.json({ data: movieList });
	}
	const movieList = await moviesService.listAllMovies();
	res.json({ data: movieList });
}

async function read(req, res, next) {
	const { movie } = res.locals;
	res.json({ data: movie });
}

module.exports = {
	list: asyncErrorBoundary(list),
	read: [asyncErrorBoundary(movieExists), read],
	movieExists,
};
