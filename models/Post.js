const {Schema, model} = require('mongoose');
const commentSchema = require('./Comment');


const postSchema = new Schema({
  dateCreated:{type:Date, default:Date.now},
  title: { type: String, required: true },
  content: { type: String },
  comments:[commentSchema],
  user:{type:Schema.Types.ObjectId, ref:'User' }
});

const Post = model('Post', postSchema);

module.exports = Post;