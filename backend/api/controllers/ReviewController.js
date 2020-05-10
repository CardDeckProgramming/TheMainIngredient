import Review from '../../models/Review';


exports.addReview = (req, res) => {
   let review = new Review(req.body);
      review.save()
            .then(review => {
               res.status(200).json({'status': 'Added successfully', 
                                     'reviewId': review._id});
            }).catch(err => {
               res.status(400).send('Failed to add new review');
            });
};

exports.getReviewById = (req, res) => {
   Review.findById(req.params.id, (err, review) => {
      if (err) {
         console.log(err);
      } else {
         res.json(review);
      }
   });
};