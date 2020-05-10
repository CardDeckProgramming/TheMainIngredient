import Recipe from '../../models/Recipe';
import Review from '../../models/Review';


exports.addRecipe = (req, res) => {
   let recipe = new Recipe(req.body);
   recipe.save()
         .then(recipe => {
            res.status(200).json({'status': 'Added successfully', 
                                  'recipeId': recipe._id});
         }).catch(err => {
            res.status(400).send('Failed to create new recipe');
         });
};

exports.updateRecipe = (req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
      if (!recipe)
         return next(new Error('Could not load Recipe'));
      else {
         recipe.author = req.body.author;
         recipe.title = req.body.title;
         recipe.type = req.body.type;
         recipe.ingredients = req.body.ingredients;
         recipe.steps = req.body.steps;

         recipe.save().then(recipe => {
            res.json({'status': 'Updated successfully', 'title': recipe.title});
         }).catch(err => {
             res.status(400).json({'status': 'Recipe failed to update'});
         });
      }
  });
};

exports.getRecipes = (req, res) => {
   Recipe.find((err, recipes) => {
      if (err) {
         console.log(err);
      } else {
         res.json(recipes);
      }
  });
};

exports.getRecipeById = (req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
         console.log(err);
      } else {
         res.json(recipe);
      }
  });
};


//Recipe-Review APIs
exports.addReviewToRecipe = (req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
          console.log(err);
      } else {
          recipe.reviews.push(req.body.reviewId);

          recipe.save().then(recipe => {
              res.status(200).json({'status': 'Updated successfully'});
          }).catch(err => {
              res.status(400).json({'status': 'Review ID failed to save to Recipe ' + req.params.id});
          });
      }
   });
};

exports.getReviewsByRecipeId = (req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
         console.log(err);
      } else {     
         Review.find({'_id': { $in: recipe.reviews}}, 
         function(err, reviews) {
            if (err) {
               console.log(err);
            } else {
               res.json(reviews);
            }
         });
      }
   });
};