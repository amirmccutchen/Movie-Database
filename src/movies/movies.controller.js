const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { response } = require("express");

//----Middleware----//
//Check if the movie exists by id
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

//----Functions----//
//List all the movies
async function list(req, res) {
  // const methodName ="list"
  // req.log.debug({__filename, methodName });
  const showing = req.query.is_showing;
  if (showing) {
    res.json({ data: await service.listMovies() });
    //   req.log.trace({ __filename, methodName, return: true, data });
  } else {
    res.json({ data: await service.list() });
  }
}

//List all the movies avalible at all theaters
async function listMoviesByTheaters(req, res, next) {
  res.json({ data: await service.listMoviesByTheaters() });
}

//List all the reviews avalible for a movie
async function listMoviesByReviews(req, res, next) {
  const { movie_id } = res.locals.movie;
  res.json({ data: await service.listMoviesByReviews(movie_id) });
}

//Reads a single movie enrty based on if exists by id
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
