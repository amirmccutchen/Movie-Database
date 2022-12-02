module.exports.seed = function (knex) {

  return knex("reviews")
    .del()
    .then(() => knex("movies_theaters").del())
    .then(() => knex("critics").del())
    .then(() => knex("movies").del())
    .then(() => knex("theaters").del());
};
