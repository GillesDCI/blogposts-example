const {Schema, model} = require('mongoose');
const postSchema = require('./Post').schema;

const userSchema = new Schema({
    dateCreated:{type:Date, required:true, default:Date.now},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    username:{type:String, required:true},
   //posts:[postSchema] //all the posts that can be added.
})


const User = model('User', userSchema);

module.exports = User;