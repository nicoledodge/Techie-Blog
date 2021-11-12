const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try{
        const newComment = await Comment.create({

            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,

        });
        res.status(200).json({message: "Comment added"});
    }catch(error){
        res.status(500).json(error);
    }
});
router.put('/:id', async (req, res) => {
    try{
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updatedComment);
    }catch(error){
        res.status(500).json(error);
    }
});
router.delete('/:id', async (req, res) => {
    try{
        console.log("Route working");

        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!deletedComment) {

            res.status(404).json("No comment to delete");
        }
        res.status(200).json(deletedComment);
    }catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;