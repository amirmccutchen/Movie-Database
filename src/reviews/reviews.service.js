const knex =  require("../db/connection");
const mapProperties = require("../utils/map-properties");

const createCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created",
    updated_at: "critic.updated"
});

function list(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select(
            "r.*",
            "c.critic_id",
            "c.preferred_name",
            "c.surname",
            "c.organization_name",
            "c.created_at as created",
            "c.updated_at as updated"
        )
        .where({ "r.movie_id": movieId })
        .then(data => data.map(createCritic))
}

function read(reviewId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*")
        .where({ review_id: reviewId })
        .first()
}

function update(updatedReview) {
    return knex("reviews as r")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then(updatedRecords => updatedRecords[0])
}

function readCritic(reviewId) {
    return knex("critics as c")
    .join("reviews as r", "r.critic_id", "c.critic_id")
    .select("c.*")
    .distinct()
    .where({ review_id: reviewId })
    .first()
}

function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del()
}

module.exports = {
    list,
    read,
    update,
    readCritic,
    delete: destroy
}
