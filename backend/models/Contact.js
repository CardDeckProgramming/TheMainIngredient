import mongoose from 'mongoose';


const Schema = mongoose.Schema;

let Contact = new Schema({
    email: {
       type: String
    },
    message: {
       type: String
    }
   
});

module.exports = mongoose.model('Contact', Contact);