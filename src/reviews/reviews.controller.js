const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// checks if review exists

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found",
  });
}

// updates a review

async function update(req, res) {
  const updatedReviews = {
    ...res.locals.review,
    ...req.body.data,
  };
  await reviewsService.update(updatedReviews);
  const data = await reviewsService.getReviewWithCritic(
    res.locals.review.review_id
  );
  res.json({ data: data });
}

// deletes a review

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
