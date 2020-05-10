import express from 'express';

const recipeRouter = express.Router();
const endpointConstants = require('../EndpointConstants');
const recipeController = require('../controllers/RecipeController');


//Recipe APIs
recipeRouter.post(endpointConstants.ADD_RECIPE, recipeController.addRecipe);

recipeRouter.post(endpointConstants.UPDATE_RECIPE, recipeController.updateRecipe);

recipeRouter.get(endpointConstants.GET_ALL_RECIPES, recipeController.getRecipes);

recipeRouter.get(endpointConstants.GET_RECIPE_BY_ID, recipeController.getRecipeById);


//Recipe-Review APIs
recipeRouter.post(endpointConstants.ADD_REVIEW_ID_TO_RECIPE, recipeController.addReviewToRecipe);

recipeRouter.get(endpointConstants.GET_REVIEWS_BY_RECIPE_ID, recipeController.getReviewsByRecipeId);


module.exports = recipeRouter;