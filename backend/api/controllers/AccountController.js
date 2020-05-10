const Account = require('../../models/Account');
const Recipe = require('../../models/Recipe');
const Review = require('../../models/Review');

//Account APIs
exports.addAccount = (req, res) => {
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
};

exports.updateAccount = (req, res) => {
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
};

exports.deleteAccount = (req, res) => {
    console.log('backend deleteAccount I made it!');     
    Account.findByIdAndRemove(req.params.id, (err, account) => {
        if (err) {
            res.json(err);
            console.log('deleteAccount failed: ' + JSON.parse(JSON.stringify(err)));        
        } else {
            res.json('Removed account ' + account + ' successfully');
            console.log('deleteAccount was successful');     
        }
    });
};

exports.getAccountById = (req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) {
            console.log(err);
        } else {
            res.json(account);
        }
    });
};

exports.accountSignIn = (req, res) => {
    Account.findOne({email: req.params.email, password: req.params.password}, (err, account) => {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(account);
        }
    });
};


//Account-Recipe APIs
exports.addRecipeToAccount = (req, res) => {
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
};

exports.deleteRecipeFromAccount = (req, res) => {
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
};

exports.getRecipesByAccountId = (req, res) => {
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
};

exports.getAccountRecipesByType = (req, res) => {
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
};


//Account-Review APIs
exports.addReviewToAccount = (req, res) => {
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
};

exports.deleteReviewFromAccount = (req, res) => {
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
};

exports.getReviewsByAccountId = (req, res) => {
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
};


//Account-Follow APIs
exports.addFollowToAccount = (req, res) => {
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
};

exports.deleteFollowFromAccount = (req, res) => {
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
};

exports.getFollowsByAccountId = (req, res) => {
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
};
