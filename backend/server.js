import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//These imports are Schemas made to put into our db collections (tables) as seen in Robo 3T
import Recipe from './models/Recipe';
import Account from './models/Account';

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
       if (err)
           console.log(err);
       else
           res.json(recipes);
   });
});

router.route('/recipes/:id').get((req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
       if (err)
           console.log(err);
       else
           res.json(issue);
   });
});

router.route('/accounts/add').post((req, res) => {
    let account = new Account(req.body);
    console.log(account);
    account.save()
        .then(account => {
            res.status(200).json({'account': 'Added successfully'});  
            console.log('Account added successfully');        
        }).catch(err => {
            res.status(400).send('Failed to create new account');
            console.log('Failed to add account');
        });
});

router.route('/recipes/add').post((req, res) => {
   let recipe = new Recipe(req.body);
   recipe.save()
       .then(recipe => {
           res.status(200).json({'recipe': 'Added successfully'});
       }).catch(err => {
           res.status(400).send('Failed to create new recipe');
       });
});

router.route('/recipes/update/:id').post((req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
       if (!recipe)
           return next(new Error('Could not load document'));
       else {
            recipe.author = req.body.author;
            recipe.title = req.body.title;
            recipe.type = req.body.type;
            recipe.ingredients = req.body.ingredients;
            recipe.steps = req.body.steps;

            recipe.save().then(recipe => {
               res.json('Update done');
           }).catch(err => {
               res.status(400).send('Update failed');
           });
       }
   });
});

router.route('/recipes/delete/:id').get((req, res) => {
   Recipe.findByIdAndRemove({_id: req.params.id}, (err, recipe) => {
       if (err)
           res.json(err);
       else
           res.json('Remove successfully');
   })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));