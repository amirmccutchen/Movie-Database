if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
app.use(cors());
app.use(express.json());

//----Routes----//

const router = express.Router();

router.get("/", cors(), (req, res) => {
    res.json({ message: "Welcome! You can access the data using these routes: /movies, /movies/:movieId, /theaters, movies/:movieId/reviews, /movies/:movieId/reviews/:reviewId" })
})

app.use("/", router);

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//----Error handlers----//
app.use(notFound);
app.use(errorHandler);

module.exports = app;
