const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

//List of all the posts 
router.get('/', async (req,res) => {

    const posts = await Post.find({}).populate('user').populate('comments.user') //.select (select only the firstname and lastname fields)
    return res.status(200).json(posts);
});


router.post('/add', async(req, res) => {
    try {
        const postToAdd = new Post({
            title:req.body.title,
            content:req.body.content,
            username:req.body.username,
            user:req.body.user
        })
        //alternative way of creating a user.
        const resultPost = await postToAdd.save();

        return res.status(200).json({message:'Post was created', createdUser:resultPost})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
})
 
//add a new post to the user itself
//HTTP BODY : {"title":"Welcome to my blog", "content":"This is my blog, here I will write about my hobbies."}
router.post('/add/comments/:id', async (req, res) => {

    const post = await Post.findById(req.params.id);

    post.comments.push(req.body); //alternative $push


    const saveResultPost = await post.save()

    return res.status(200).json({message:'Comment created', saveResultPost});
});


router.get('/posts/byuser/:id', async(req, res) => {
    const posts = await Post.find({user:req.params.id}).populate('user');

    return res.status(200).json({message:`User posts:`, posts:posts})

});


module.exports = router;