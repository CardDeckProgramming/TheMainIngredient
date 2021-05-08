"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Account = _interopRequireDefault(require("./models/Account"));

var _Contact = _interopRequireDefault(require("./models/Contact"));

var _Recipe = _interopRequireDefault(require("./models/Recipe"));

var _Review = _interopRequireDefault(require("./models/Review"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//These imports are Schemas made to put into our db collections (tables) as seen in Robo 3T
var app = (0, _express["default"])();

var router = _express["default"].Router();

require('dotenv').config({
  path: __dirname + '/.env'
});

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
var uri = process.env.mongoDBUri || 'mongodb://localhost:27017/recipes';
var port = process.env.port || 3000; //Connect our local db with our server

_mongoose["default"].connect(uri);

_mongoose["default"].connection.once('Open', function () {
  console.log('MongoDB database connection established successfully');
}).on('error', function (error) {
  console.log('MongoDB Connection Error: ', error);
}); //All these function below are the API calls we use the get, post, update and delete data from the database
//Accounts Collection
//Add Account


router.route('/accounts/add').post(function (req, res) {
  var newAccount = new _Account["default"](req.body);
  console.log(newAccount);

  _Account["default"].findOne({
    email: req.body.email
  }, function (err, account) {
    if (account) {
      res.json(null);
    } else {
      newAccount.save().then(function (account) {
        res.status(200).json({
          'status': 'Added successfully',
          'accountId': account._id,
          'accountFirst': account.first,
          'accountEmail': account.email,
          'accountPassword': account.password
        });
        console.log('Account added successfully');
      })["catch"](function (err) {
        res.status(400).send('Failed to create new account: ' + err);
        console.log('Failed to create new account: ' + err);
      });
    }
  });
}); //Log Into Account

router.route('/accounts/:email/:password').get(function (req, res) {
  _Account["default"].findOne({
    email: req.params.email,
    password: req.params.password
  }, function (err, account) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(account);
      res.json(account);
    }
  });
}); //Get Account (Profile) By Id

router.route('/accounts/:id').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      res.json(account);
    }
  });
}); //Update Account (Profile)

router.route('/accounts/update/:id').post(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (!account) {
      return next(new Error('Could not load Account'));
    } else {
      account.first = req.body.first;
      account.last = req.body.last;
      account.gender = req.body.gender;
      account.bio = req.body.bio;
      account.save().then(function (account) {
        res.json({
          'status': 'Account Updated successfully'
        });
      })["catch"](function (err) {
        res.status(400).json({
          'status': 'Account failed to update'
        });
      });
    }
  });
}); //Add Recipe Ref to Account

router.route('/accounts/:id/recipes/add').post(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (!account) {
      return next(new Error('Could not load Account'));
    } else {
      account.recipes.push(req.body.recipeId);
      account.save().then(function (account) {
        console.log('Added Recipe ref Id');
        res.status(200).json({
          'status': 'Recipe ID saved to Account ' + req.params.id
        });
      })["catch"](function (err) {
        res.status(400).json({
          'status': 'Recipe ID failed to save to Account ' + req.params.id
        });
      });
    }
  });
}); //Get Recipes based on the Account Id (Get All Recipes from an Account)

router.route('/accounts/:id/recipes/all').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      console.log(err);
    } else if (account.recipes != null) {
      _Recipe["default"].find({
        '_id': {
          $in: account.recipes
        }
      }, function (err, recipes) {
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
}); //Get Account Recipes By Sorting Type

router.route('/accounts/:id/recipes/:type').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      if (req.params.type == 'All') {
        _Recipe["default"].find({
          '_id': {
            $in: account.recipes
          }
        }, function (err, recipes) {
          if (err) {
            console.log(err);
          } else {
            res.json(recipes);
          }
        });
      } else {
        _Recipe["default"].find({
          '_id': {
            $in: account.recipes
          },
          type: req.params.type
        }, function (err, recipes) {
          if (err) {
            console.log(err);
          } else {
            res.json(recipes);
          }
        });
      }
    }
  });
}); //Delete Account 

router.route('/account/delete/:id').get(function (req, res) {
  _Account["default"].findByIdAndRemove({
    _id: req.params.id
  }, function (err, account) {
    if (err) {
      res.json(err);
    } else {
      res.json('Removed account successfully');
    }
  });
}); //Recipe Collection
//Recipe Add

router.route('/recipes/add').post(function (req, res) {
  var recipe = new _Recipe["default"](req.body);
  recipe.save().then(function (recipe) {
    res.status(200).json({
      'status': 'Added successfully',
      'recipeId': recipe._id
    });
  })["catch"](function (err) {
    res.status(400).send('Failed to create new recipe');
  });
}); //Get All Recipes

router.route('/recipes').get(function (req, res) {
  _Recipe["default"].find(function (err, recipes) {
    if (err) {
      console.log(err);
    } else {
      res.json(recipes);
    }
  });
}); //Get Recipe By Id

router.route('/recipes/:id').get(function (req, res) {
  _Recipe["default"].findById(req.params.id, function (err, recipe) {
    if (err) {
      console.log(err);
    } else {
      res.json(recipe);
    }
  });
}); //Update Recipe

router.route('/recipes/update/:id').post(function (req, res) {
  _Recipe["default"].findById(req.params.id, function (err, recipe) {
    if (!recipe) return next(new Error('Could not load Recipe'));else {
      recipe.author = req.body.author;
      recipe.title = req.body.title;
      recipe.type = req.body.type;
      recipe.ingredients = req.body.ingredients;
      recipe.steps = req.body.steps;
      recipe.save().then(function (recipe) {
        res.json({
          'status': 'Updated successfully',
          'title': recipe.title
        });
      })["catch"](function (err) {
        res.status(400).json({
          'status': 'Recipe failed to update'
        });
      });
    }
  });
}); //Delete Recipe

router.route('/account/:accountId/recipes/delete/:recipeId').get(function (req, res) {
  _Account["default"].findById(req.params.accountId, function (err, account) {
    if (err) {
      res.json(err);
    } else {
      account.recipes.remove(req.params.recipeId);
      account.save(_Recipe["default"].findByIdAndRemove({
        _id: req.params.recipeId
      }, function (err, recipe) {
        if (err) {
          res.json(err);
        } else {
          res.json('Removed recipe id and recipe successfully');
        }
      }));
    }
  });
}); //Follow Collection
//Add Follow

router.route('/account/:id/follows/add').post(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (!account) {
      return next(new Error('Could not load Account'));
    } else {
      account.follows.push(req.body.followId);
      account.save().then(function (account) {
        console.log('Added Follow Ref Id');
        res.status(200).json({
          'status': 'Recipe ID saved to Account ' + req.params.id
        });
      })["catch"](function (err) {
        res.status(400).json({
          'status': 'Recipe ID failed to save to Account ' + req.params.id
        });
      });
    }
  });
}); //Get Follows based on the Account Id (Get All Added Follows from an Account)

router.route('/account/:id/follows/all').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      _Account["default"].find({
        '_id': {
          $in: account.follows
        }
      }, function (err, accounts) {
        if (err) {
          console.log(err);
        } else {
          res.json(accounts);
        }
      });
    }
  });
}); //Delete Follow

router.route('/account/:id/follows/delete/:followId').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      res.json(err);
    } else {
      account.follows.remove(req.params.followId);
      account.save(res.json('Removed follow id and follow successfully'));
    }
  });
}); //Contact Colleaction
//Add Contact

router.route('/contact/add').post(function (req, res) {
  var account = new _Contact["default"](req.body);
  account.save().then(function (contact) {
    res.status(200).json({
      'status': 'Added successfully',
      'contactId': account._id,
      'contactEmail': account.email,
      'contactMessage': account.password
    });
    console.log('Contact added successfully');
  })["catch"](function (err) {
    res.status(400).send('Failed to create new contact: ' + err);
    console.log('Failed to create new contact: ' + err);
  });
}); //Get Contact

router.route('/Contact/:email/:Message').get(function (req, res) {
  _Account["default"].findOne({
    email: req.params.email,
    message: req.params.message
  }, function (err, account) {
    if (err) {
      res.json(err);
    } else {
      res.json(_Contact["default"]);
    }
  });
}); //Review Collection
//Review Add

router.route('/reviews/add').post(function (req, res) {
  var review = new _Review["default"](req.body);
  review.save().then(function (review) {
    res.status(200).json({
      'status': 'Added successfully',
      'reviewId': review._id
    });
  })["catch"](function (err) {
    res.status(400).send('Failed to add new review');
  });
}); //Get Review By Id

router.route('/reviews/:id').get(function (req, res) {
  _Review["default"].findById(req.params.id, function (err, review) {
    if (err) {
      console.log(err);
    } else {
      res.json(review);
    }
  });
}); //Add Review Ref to Account 

router.route('/accounts/:id/reviews/add').post(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      account.reviews.push(req.body.reviewId);
      account.save().then(function (account) {
        res.status(200).json({
          'status': 'Added successfully',
          'reviewId': req.body.reviewId
        });
      })["catch"](function (err) {
        res.status(400).json({
          'status': 'Review ID failed to save to Account ' + req.params.id
        });
      });
    }
  });
}); //Add Review Ref to Recipe

router.route('/recipes/:id/reviews/add').post(function (req, res) {
  _Recipe["default"].findById(req.params.id, function (err, recipe) {
    if (err) {
      console.log(err);
    } else {
      recipe.reviews.push(req.body.reviewId);
      recipe.save().then(function (recipe) {
        res.status(200).json({
          'status': 'Updated successfully'
        });
      })["catch"](function (err) {
        res.status(400).json({
          'status': 'Review ID failed to save to Recipe ' + req.params.id
        });
      });
    }
  });
}); //Get Reviews based on the Account Id (Get All Added Reviews from an Account)

router.route('/account/:id/reviews/all').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      console.log(err);
    } else {
      _Review["default"].find({
        '_id': {
          $in: account.reviews
        }
      }, function (err, reviews) {
        if (err) {
          console.log(err);
        } else {
          res.json(reviews);
        }
      });
    }
  });
}); //Get Reviews based on the Recipe Id (Get All Added Reviews from a Recipe)

router.route('/recipe/:id/reviews/all').get(function (req, res) {
  _Recipe["default"].findById(req.params.id, function (err, recipe) {
    if (err) {
      console.log(err);
    } else {
      _Review["default"].find({
        '_id': {
          $in: recipe.reviews
        }
      }, function (err, reviews) {
        if (err) {
          console.log(err);
        } else {
          res.json(reviews);
          console.log('Reviews: ' + reviews);
        }
      });
    }
  });
}); //Delete Review

router.route('/account/:id/reviews/delete/:reviewId').get(function (req, res) {
  _Account["default"].findById(req.params.id, function (err, account) {
    if (err) {
      res.json(err);
    } else {
      account.reviews.remove(req.params.reviewId);
      account.save(_Review["default"].findByIdAndRemove({
        _id: req.params.reviewId
      }, function (err, review) {
        if (err) {
          res.json(err);
        } else {
          res.json('Removed review id and review successfully');
        }
      }));
    }
  });
}); //Search Results Collection 

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

;
router.get('/search-results/search', function (req, res) {
  if (req.query.lastName.length > 0) {
    var firstName = new RegExp(escapeRegex(req.query.firstName), 'gi');
    var lastName = new RegExp(escapeRegex(req.query.lastName), 'gi');

    _Account["default"].find({
      first: firstName,
      last: lastName
    }, function (err, accounts) {
      if (err) {
        console.log(err);
      } else if (accounts.length > 0) {
        res.json(accounts);
      } else {
        res.json(null);
      }
    });
  } else {
    var name = new RegExp(escapeRegex(req.query.firstName), 'gi');

    _Account["default"].find({
      first: name
    }, function (err, accounts) {
      if (err) {
        console.log(err);
      } else if (accounts.length > 0) {
        res.json(accounts);
      } else {
        res.json(null);
      }
    });
  }
}); //Server

app.use('/api', router);
app.use(_express["default"]["static"](__dirname + '/dist')).all('/*', function (req, res) {
  res.status(200).set({
    'content-type': 'text/html; charset=utf-8'
  }) // .sendfile('src/dist/index.html' );
  .sendfile('dist/index.html');
});
app.listen(port, function () {
  return console.log("Express server running on port ".concat(port));
});