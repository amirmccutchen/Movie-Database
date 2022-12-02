const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { response } = require("express");

// checks if the movie exists 

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  console.log(movieId);
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found`,
  });
}

// lists all movies

async function list(req, res) {

  const showing = req.query.is_showing;
  if (showing) {
    res.json({ data: await service.listMovies() });
  } else {
    res.json({ data: await service.list() });
  }
}

// lists all movies available in all theaters

async function listMoviesByTheaters(req, res, next) {
  res.json({ data: await service.listMoviesByTheaters() });
}

// lists all the reviews avalible for a movie

async function listMoviesByReviews(req, res, next) {
  const { movie_id } = res.locals.movie;
  res.json({ data: await service.listMoviesByReviews(movie_id) });
}

// reads a single movie entry

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { movie } = res.locals;
  res.json({ data: movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listMoviesByTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMoviesByTheaters),
  ],
  listMoviesByReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMoviesByReviews),
  ],
};
