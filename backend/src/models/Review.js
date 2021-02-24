import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Review = new Schema({
   title: {
      type: String
   },
   recipeBy: {
      type: String
   },
   score: {
      type: String
   }, 
   review: {
      type: String
   },
   reviewBy: {
      type: String
   }
});

export default mongoose.model('Review', Review);