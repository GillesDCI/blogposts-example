const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
  dateCreated:{type:Date, default:Date.now},
  title: { type: String, required: true },
  content:{type:String, required:true },
  user: { type:Schema.Types.ObjectId, ref:'User' },  
});

//const Comment = model('Comment', commentSchema);

module.exports = commentSchema;