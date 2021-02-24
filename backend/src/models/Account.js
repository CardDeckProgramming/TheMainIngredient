import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Account = new Schema({
   first: {
      type: String
   }, 
   last: {
      type: String
   },
   gender: {
      type: String
   },
   email: {
       type: String
    },
   password: {
      type: String
   },
   bio: {
      type: String,
      default: ''
   },
   recipes: {
      type: []
   },
   follows: {
      type: []
   },
   reviews: {
      type: []
   }
});

export default mongoose.model('Account', Account);