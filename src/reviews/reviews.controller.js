const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// const VALID_PROPERTIES = ["score", "content"];

//----Middleware----//
//check the propertis to make sure they match
// function hasValidProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (invalidFields.length)
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(", ")}`,
//     });
//   next();
// }

//Checks to see if the review exists based on the id
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

//----Functions----//
//Updates a review based on the id
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

//Deletes a review based on its id
async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
