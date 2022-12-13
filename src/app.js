if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
// const logger = require("./config/logger");

// app.use(logger);
app.use(cors());
app.use(express.json());

//----router----//
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//----Error handlers----//
app.use(notFound);
app.use(errorHandler);

module.exports = app;
