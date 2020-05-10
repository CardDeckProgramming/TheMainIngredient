import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const endpointConstants = require('./api/EndpointConstants');
const accountRoutes = require('./api/routes/AccountRouter');
const recipeRoutes = require('./api/routes/RecipeRouter');
const reviewRoutes = require('./api/routes/ReviewRouter');
const searchRoutes = require('./api/routes/SearchRouter');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/recipes');
mongoose.connection.once('Open', () => {
        console.log('MongoDB database connection established successfully');
    }).on('error', error => {
        console.log('MongoDB Connection Error: ', error);
});

/*
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
*/

app.use(endpointConstants.ACCOUNTS_API, accountRoutes);
app.use(endpointConstants.ACCOUNT_API, accountRoutes);
app.use(endpointConstants.RECIPES_API, recipeRoutes);
app.use(endpointConstants.REVIEW_API, reviewRoutes);
app.use(endpointConstants.SEARCH_API, searchRoutes);

app.use(express.static(__dirname + '/dist'));
app.listen(80, () => console.log('Express server running on port 80'));