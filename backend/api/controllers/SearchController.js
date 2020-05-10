const Account = require('../../models/Account');

//Search API
exports.searchResults = (req, res) => {
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
};

function escapeRegex(text) {
   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};