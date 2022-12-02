const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// adds properties

const addCritics = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// lists the review

function read(review_id) {
  return knex("reviews").select("*").where({ review_id: review_id }).first();
}

// updates a review

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

// lists the reviews and adds the critics table data for the specific movie and review

function getReviewWithCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedReview = addCritics(result);
      return updatedReview;
    });
}

// deletes the review

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  update,
  getReviewWithCritic,
  read,
  delete: destroy,
};
