const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try{
        const newPost = await Post.create({
            title: req.body.postTitle,
            content: req.body.postContent,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }

});
//update post
router.put('/:id', async (req, res) => {
    try{
        console.log('post put route');
        console.log(req.body);
        const updatedPost = await Post.update({title: req.body.postTitle, content: req.body.postContent}, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedPost);
    }catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.delete('/:id', async (req, res) => {
    try{
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deletedPost);
    }catch(error) {
        res.status(500).json(error);
    }
});

module.exports=router;