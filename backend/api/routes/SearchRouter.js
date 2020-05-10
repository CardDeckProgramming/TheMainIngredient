import express from 'express';

const searchRouter = express.Router();
const endpointConstants = require('../EndpointConstants');
const searchController = require('../controllers/SearchController');


//Search API
searchRouter.get(endpointConstants.GET_SEARCH, searchController.searchResults);


module.exports = searchRouter;