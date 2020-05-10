

//API Endpoints
export const ACCOUNTS_API = '/api/accounts';
export const ACCOUNT_API = '/api/account';
export const RECIPES_API = '/api/recipes';
export const REVIEW_API = '/api/reviews';
export const SEARCH_API = '/api/search';


//Account API Endpoints
export const ADD_ACCOUNT = '/add';
export const UPDATE_ACCOUNT = '/update/:id';
export const DELETE_ACCOUNT = '/delete/:id'; //account
export const GET_ACCOUNT_BY_ID = '/:id';
export const SIGN_INTO_ACCOUNT = '/:email/:password';


//Recipe API Endpoints
export const ADD_RECIPE = '/add';
export const ADD_RECIPE_TO_ACCOUNT = '/:id/recipes/add';
export const UPDATE_RECIPE = '/update/:id';
export const DELETE_RECIPE_FROM_ACCOUNT = '/:accountId/recipes/delete/:recipeId'; //account
export const GET_ALL_RECIPES = '/';
export const GET_RECIPE_BY_ID = '/:id';
export const GET_RECIPES_BY_ACCOUNT_ID = '/:id/recipes/all';
export const GET_RECIPES_BY_TYPE = '/:id/recipes/:type';


//Review API Endpoints
export const ADD_REVIEW = '/add';
export const ADD_REVIEW_ID_TO_ACCOUNT = '/:id/reviews/add';
export const ADD_REVIEW_ID_TO_RECIPE = '/:id/reviews/add';
export const DELETE_REVIEW_FROM_ACCOUNT = '/:id/reviews/delete/:reviewId'; //account
export const GET_REVIEW_BY_ID = '/:id';
export const GET_REVIEWS_BY_ACCOUNT_ID = '/:id/reviews/all'; //account
export const GET_REVIEWS_BY_RECIPE_ID = '/:id/reviews/all'; 


//Follow API Endpoints
export const ADD_FOLLOW = '/:id/follows/add'; //account
export const DELETE_FOLLOW = '/:id/follows/delete/:followId'; //account
export const GET_FOLLOWS_BY_ACCOUNT_ID = '/:id/follows/all'; //account


//Search API Endpoints 
export const GET_SEARCH = '';