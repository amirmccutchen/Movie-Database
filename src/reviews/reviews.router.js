const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controllers");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;