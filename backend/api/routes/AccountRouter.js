import express from 'express';

const accountRouter = express.Router();
const endpointConstants = require('../EndpointConstants');
const accountController = require('../controllers/AccountController');


//Account APIs
accountRouter.post(endpointConstants.ADD_ACCOUNT, accountController.addAccount);

accountRouter.post(endpointConstants.UPDATE_ACCOUNT, accountController.updateAccount);

accountRouter.get(endpointConstants.DELETE_ACCOUNT, accountController.deleteAccount);

accountRouter.get(endpointConstants.GET_ACCOUNT_BY_ID, accountController.getAccountById);

accountRouter.get(endpointConstants.SIGN_INTO_ACCOUNT, accountController.accountSignIn);


//Account-Recipe APIs
accountRouter.post(endpointConstants.ADD_RECIPE_TO_ACCOUNT, accountController.addRecipeToAccount);

accountRouter.get(endpointConstants.DELETE_RECIPE_FROM_ACCOUNT, accountController.deleteRecipeFromAccount);

accountRouter.get(endpointConstants.GET_RECIPES_BY_ACCOUNT_ID, accountController.getRecipesByAccountId);

accountRouter.get(endpointConstants.GET_RECIPES_BY_TYPE, accountController.getAccountRecipesByType);


//Account-Review APIs
accountRouter.post(endpointConstants.ADD_REVIEW_ID_TO_ACCOUNT, accountController.addReviewToAccount);

accountRouter.get(endpointConstants.DELETE_REVIEW_FROM_ACCOUNT, accountController.deleteReviewFromAccount);

accountRouter.get(endpointConstants.GET_REVIEWS_BY_ACCOUNT_ID, accountController.getReviewsByAccountId);


//Account-Follow APIs
accountRouter.post(endpointConstants.ADD_FOLLOW, accountController.addFollowToAccount);

accountRouter.get(endpointConstants.DELETE_FOLLOW, accountController.deleteFollowFromAccount);

accountRouter.get(endpointConstants.GET_FOLLOWS_BY_ACCOUNT_ID, accountController.getFollowsByAccountId);


module.exports = accountRouter;