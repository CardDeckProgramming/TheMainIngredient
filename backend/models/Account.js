import mongoose from 'mongoose';
//import Recipe from './Recipe';

const Schema = mongoose.Schema;

let Account = new Schema({
    email: {
       type: String
    },
    password: {
       type: String
    },
    recipes: {
       type: []
    }
});

export default mongoose.model('Account', Account);