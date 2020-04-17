import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Recipe = new Schema({
    author: {
       type: String
    },
    title: {
       type: String
    },
    type: {
       type: String
    },
    ingredients: {
       type: []
    },
    steps: {
       type: []
    },
    reviews: {
       type: []
    }
});

export default mongoose.model('Recipe', Recipe);