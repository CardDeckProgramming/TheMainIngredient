import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Account = new Schema({
    email: {
       type: String
    },
    password: {
       type: String
    },
    username: {
       type: String,
       default: ''
    },
    recipes: {
       type: []
    }
});

export default mongoose.model('Account', Account);