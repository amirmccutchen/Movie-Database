const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

// will iterate throught the array of reviews to add the appropriate critic properties

function iterateAddCritic(reviewsArray) {
  const results = [];
  reviewsArray.forEach((review) => {
    results.push(addCritic(review));
  });
  return results;
}

// lists all movies

function list() {
  return knex("movies").select("*");
}

// lists all movies by the is_showing status on the movies_theaters table based

function listMovies() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}

// lists all the movies by id by the theaters
function listMoviesByTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as th", "mt.theater_id", "th.theater_id")
    .select("th.*")
    .groupBy("th.theater_id");
}

//List the movies by id by reviews
function listMoviesByReviews(movie_id) {
  console.log(movie_id);
  return knex("movies as m")
    .join("reviews as rv", "m.movie_id", "rv.movie_id")
    .join("critics as c", "rv.critic_id", "c.critic_id")
    .select("rv.*", "c.*")
    .where({ "rv.movie_id": movie_id })
    .then((reviews) => iterateAddCritic(reviews));
}

//selects the the movie based on the movie_id
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  read,
  listMovies,
  listMoviesByTheaters,
  listMoviesByReviews,
};
