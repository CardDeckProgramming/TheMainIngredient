import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//These imports are Schemas made to put into our db collections (tables) as seen in Robo 3T
import Recipe from './models/Recipe';
import Account from './models/Account';
import Contact from './models/Contact';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

//Connect our local db with our server
mongoose.connect('mongodb://localhost:27017/recipes');
mongoose.connection.once('Open', () => {
   console.log('MongoDB database connection established successfully');
}).on('error', () => {
console.log('MongoDB Connection Error: ', error);
});

//All these function below are the API calls we use the get, post, update and delete data from the database

router.route('/recipes').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });
});

router.route('/recipes/:id').get((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
           console.log(err);
        } else {
           res.json(recipe);
        }
    });
});

router.route('/accounts/getAccount/:email/:password').get((req, res) => {
    console.log('I was called');
    console.log('Email: ' + req.params.email + ', Password: ' + req.params.password);
    Account.findOne({email: req.params.email, password: req.params.password}, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            res.json(account);
        }
    });
});

router.route('/accounts/add').post((req, res) => {
    let account = new Account(req.body);
    console.log(account);
    account.save()
        .then(account => {
            res.status(200).json({'status': 'Added successfully', 
                                  'accountId': account._id, 
                                  'accountEmail': account.email, 
                                  'accountPassword': account.password,
                                  'accountUsername': account.username});  
            console.log('Account added successfully');        
        }).catch(err => {
            res.status(400).send('Failed to create new account: ' + err);
            console.log('Failed to create new account: ' + err);
        });
});
router.route('/Contact/getContact/:email/:Message').get((req, res) => {
    console.log('I was called');
    console.log('Email: ' + req.params.email + ', Message: ' + req.params.message);
    Account.findOne({email: req.params.email, message: req.params.message}, (err, account) => {
        if (err) {
            res.json(err);
        } else {
            res.json(Contact);
        }
    });
});

router.route('/contact/add').post((req, res) => {
    let account = new Contact(req.body);
    console.log(Contact);
    account.save()
        .then(Contact => {
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

//Accounts Collection (table) - Specifically Add Recipe ID to Recipe array
router.route('/accounts/:id/addRecipe').post((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (!account) {
            return next(new Error('Could not load Account'));
        } else {
            account.recipes.push(req.body.recipeId);

            account.save().then(account => {
               res.status(200).json({'status': 'Recipe ID saved to Account ' + req.params.id});
            }).catch(err => {
                res.status(400).json({'status': 'Recipe ID failed to save to Account ' + req.params.id});
            });
        }
    });
});

//Get Recipes based on the Account ID
router.route('/accounts/:id/recipes').get((req, res) => {  
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else {       
            Recipe.find({
                '_id': { $in: account.recipes }
            }, function(err, recipes) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(recipes);
                }
            });
        }
    });
});

//Recipe Collection (table)
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

//Recipe Collection (table)
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

//Recipe Collection (table)
router.route('/recipes/delete/:id').get((req, res) => {
    Recipe.findByIdAndRemove({_id: req.params.id}, (err, recipe) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Remove successfully');
        }
    })
})

app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));