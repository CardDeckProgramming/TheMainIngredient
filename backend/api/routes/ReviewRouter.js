import express from 'express';

const reviewRouter = express.Router();
const endpointConstants = require('../EndpointConstants');
const reviewController = require('../controllers/ReviewController');


//Review APIs
reviewRouter.post(endpointConstants.ADD_REVIEW, reviewController.addReview);

reviewRouter.get(endpointConstants.GET_REVIEW_BY_ID, reviewController.getReviewById);


module.exports = reviewRouter;