const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// Checks if review exists
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId);
    if (review) {
        res.locals.reviewId = reviewId;
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: `A review with an ID of ${reviewId} cannot be found`
    })
}

// Lists all the reviews
async function list(req, res, next) {
    const data = await reviewsService.list(res.locals.movieId)
    res.json({ data });
}

// Updates a review
async function update(req, res, next) {
    const critic = await reviewsService.readCritic(res.locals.reviewId)
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    }
    await reviewsService.update(updatedReview)
    updatedReview["critic"] = critic
    res.status(201).json({ data: updatedReview });
}

async function destroy(req, res, next) {
    await reviewsService.delete(res.locals.review.review_id)
    res.sendStatus(204);
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ]
}