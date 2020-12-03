import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//These imports are Schemas made to put into our db collections (tables) as seen in Robo 3T
import Account from './models/Account';
import Contact from './models/Contact';
import Recipe from './models/Recipe';
import Review from './models/Review';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

//Connect our local db with our server
mongoose.connect('mongodb://localhost:27017/recipes');
mongoose.connection.once('Open', () => {
        console.log('MongoDB database connection established successfully');
    }).on('error', error => {
        console.log('MongoDB Connection Error: ', error);
});

//All these function below are the API calls we use the get, post, update and delete data from the database

//Accounts Collection
//Add Account
router.route('/accounts/add').post((req, res) => {
    let newAccount = new Account(req.body);
    console.log(newAccount);
    Account.findOne({email: req.body.email}, (err, account) => {
        if (account) {
            res.json(null);
        } else {
            newAccount.save().then(account => {
                res.status(200).json({'status': 'Added successfully', 
                                      'accountId': account._id, 
                                      'accountFirst': account.first,
                                      'accountEmail': account.email, 
                                      'accountPassword': account.password});              
                console.log('Account added successfully');        
            }).catch(err => {
                res.status(400).send('Failed to create new account: ' + err);
                console.log('Failed to create new account: ' + err);
            });
        }
    });
});

//Log Into Account
router.route('/accounts/:email/:password').get((req, res) => {
    Account.findOne({email: req.params.email, password: req.params.password}, (err, account) => {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            console.log(account);
            res.json(account);
        }
    });
});

//Get Account (Profile) By Id
router.route('/accounts/:id').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
           console.log(err);
        } else {
           res.json(account);
        }
    });
});

//Update Account (Profile)
router.route('/accounts/update/:id').post((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (!account) {
            return next(new Error('Could not load Account'));
        } else {
            account.first = req.body.first;
            account.last = req.body.last;
            account.gender = req.body.gender;
            account.bio = req.body.bio;

            account.save().then(account => {
               res.json({'status': 'Account Updated successfully'});
            }).catch(err => {
                res.status(400).json({'status': 'Account failed to update'});
            });
        }
    });
});

//Add Recipe Ref to Account
router.route('/accounts/:id/recipes/add').post((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (!account) {
            return next(new Error('Could not load Account'));
        } else {
            account.recipes.push(req.body.recipeId);

            account.save().then(account => {
               console.log('Added Recipe ref Id');
               res.status(200).json({'status': 'Recipe ID saved to Account ' + req.params.id});
            }).catch(err => {
                res.status(400).json({'status': 'Recipe ID failed to save to Account ' + req.params.id});
            });
        }
    });
});

//Get Recipes based on the Account Id (Get All Recipes from an Account)
router.route('/accounts/:id/recipes/all').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else if (account.recipes != null) {       
            Recipe.find({'_id': { $in: account.recipes}}, 
            function(err, recipes) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(recipes);
                }
            });
        } else {
            console.log("Recipes are null");
        }
    });
});

//Get Account Recipes By Sorting Type
router.route('/accounts/:id/recipes/:type').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else {       
            if (req.params.type == 'All') {
                Recipe.find({'_id': { $in: account.recipes}}, 
                function(err, recipes) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(recipes);
                    }
                });
            } else {
                Recipe.find({'_id': { $in: account.recipes}, 
                            type: req.params.type}, 
                            function(err, recipes) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.json(recipes);
                                }
                            });
            }
        }
    });
});

//Delete Account 
router.route('/account/delete/:id').get((req, res) => {
    Account.findByIdAndRemove({_id: req.params.id}, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed account successfully');
        }
    });
});



//Recipe Collection
//Recipe Add
router.route('/recipes/add').post((req, res) => {
    let recipe = new Recipe(req.body);
    recipe.save()
        .then(recipe => {
            res.status(200).json({'status': 'Added successfully', 
                                  'recipeId': recipe._id});
        }).catch(err => {
            res.status(400).send('Failed to create new recipe');
        });
});

//Get All Recipes
router.route('/recipes').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });
});

//Get Recipe By Id
router.route('/recipes/:id').get((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
           console.log(err);
        } else {
           res.json(recipe);
        }
    });
});

//Update Recipe
router.route('/recipes/update/:id').post((req, res) => {
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
});

//Delete Recipe
router.route('/account/:accountId/recipes/delete/:recipeId').get((req, res) => {
    Account.findById(req.params.accountId, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            account.recipes.remove(req.params.recipeId);
            account.save(
                Recipe.findByIdAndRemove({_id: req.params.recipeId}, (err, recipe) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json('Removed recipe id and recipe successfully');
                    }
                })
            );
        }
    });
});



//Follow Collection
//Add Follow
router.route('/account/:id/follows/add').post((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (!account) {
            return next(new Error('Could not load Account'));
        } else {
            account.follows.push(req.body.followId);

            account.save().then(account => {
               console.log('Added Follow Ref Id');
               res.status(200).json({'status': 'Recipe ID saved to Account ' + req.params.id});
            }).catch(err => {
                res.status(400).json({'status': 'Recipe ID failed to save to Account ' + req.params.id});
            });
        }
    });
});

//Get Follows based on the Account Id (Get All Added Follows from an Account)
router.route('/account/:id/follows/all').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else {       
            Account.find({'_id': { $in: account.follows}}, 
            function(err, accounts) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(accounts);
                }
            });
        }
    });
});

//Delete Follow
router.route('/account/:id/follows/delete/:followId').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            account.follows.remove(req.params.followId);
            account.save(
                res.json('Removed follow id and follow successfully')
            );
        }
    });
});



//Contact Colleaction
//Add Contact
router.route('/contact/add').post((req, res) => {
    let account = new Contact(req.body);
    account.save()
        .then(contact => {
            res.status(200).json({'status': 'Added successfully', 
                                  'contactId': account._id, 
                                  'contactEmail': account.email, 
                                  'contactMessage': account.password});  
            console.log('Contact added successfully');        
        }).catch(err => {
            res.status(400).send('Failed to create new contact: ' + err);
            console.log('Failed to create new contact: ' + err);
        });
});

//Get Contact
router.route('/Contact/:email/:Message').get((req, res) => {
    Account.findOne({email: req.params.email, message: req.params.message}, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            res.json(Contact);
        }
    });
});



//Review Collection
//Review Add
router.route('/reviews/add').post((req, res) => {
    let review = new Review(req.body);
    review.save()
        .then(review => {
            res.status(200).json({'status': 'Added successfully', 
                                  'reviewId': review._id});
        }).catch(err => {
            res.status(400).send('Failed to add new review');
        });
});

//Get Review By Id
router.route('/reviews/:id').get((req, res) => {
    Review.findById(req.params.id, (err, review) => {
        if (err) {
           console.log(err);
        } else {
           res.json(review);
        }
    });
});

//Add Review Ref to Account 
router.route('/accounts/:id/reviews/add').post((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else {
            account.reviews.push(req.body.reviewId);
            
            account.save().then(account => {
                res.status(200).json({'status': 'Added successfully', 
                                      'reviewId': req.body.reviewId});
            }).catch(err => {
                res.status(400).json({'status': 'Review ID failed to save to Account ' + req.params.id});
            });
        }
    });
});

//Add Review Ref to Recipe
router.route('/recipes/:id/reviews/add').post((req, res) => {
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
});

//Get Reviews based on the Account Id (Get All Added Reviews from an Account)
router.route('/account/:id/reviews/all').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else {       
            Review.find({'_id': { $in: account.reviews}}, 
            function(err, reviews) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(reviews);
                }
            });
        }
    });
});

//Get Reviews based on the Recipe Id (Get All Added Reviews from a Recipe)
router.route('/recipe/:id/reviews/all').get((req, res) => {
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
                    console.log('Reviews: ' + reviews);
                }
            });
        }
    });
});

//Delete Review
router.route('/account/:id/reviews/delete/:reviewId').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            account.reviews.remove(req.params.reviewId);
            account.save(
                Review.findByIdAndRemove({_id: req.params.reviewId}, (err, review) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json('Removed review id and review successfully');
                    }
                })
            );
        }
    });
});


//Search Results Collection 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/search-results/search', function(req, res) {
    if (req.query.lastName.length > 0) {
        const firstName = new RegExp(escapeRegex(req.query.firstName), 'gi');
        const lastName = new RegExp(escapeRegex(req.query.lastName), 'gi');
        
        Account.find({ first: firstName, last: lastName }, (err, accounts) => {
            if (err) {
                console.log(err);
            } else if (accounts.length > 0) {
                res.json(accounts)
            } else {
                res.json(null);
            }
        });  
    } else {
        const name = new RegExp(escapeRegex(req.query.firstName), 'gi');
        Account.find({ first: name, }, (err, accounts) => {
            if (err) {
                console.log(err);
            } else if (accounts.length > 0) {
                res.json(accounts)
            } else {
                res.json(null);
            }
        });  
    }
});



//Server
app.use('/api', router);
app.use(express.static(__dirname + '/dist'))
    .all('/*', function ( req, res ) {
                res
                .status( 200 )
                .set( { 'content-type': 'text/html; charset=utf-8' } )
                .sendfile('dist/index.html' );
    });
app.listen(80, () => console.log('Express server running on port 80'));