const knex = require("../db/connection");

// a list query for all movies
function listAllMovies() {
    return knex("movies")
        .select("*");
}

// queries movies that are showing in theaters by combining movies and movies_theaters tables
function listShowingMovies(boolean) {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .distinct()
        .where({ is_showing: boolean });
}

// queries a specific movie based on the ID
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first()
        .then(data => data);
}

module.exports = {
    listAllMovies,
    listShowingMovies,
    read
}