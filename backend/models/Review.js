import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Review = new Schema({
   title: {
      type: String
   },
   score: {
      type: String
   }, 
   review: {
      type: String
   }
});

export default mongoose.model('Review', Review);