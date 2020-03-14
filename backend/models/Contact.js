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

export default mongoose.model('Contact', Contact);