//get routes
const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            required: true,
            where: {
                id: req.session.user_id
            }
        }]
    });
    const posts = postData.map((post) => {
        return post.get({
            plain: true
        });
    });
    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
    });
});

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: User,
            attributes: ['username']
        }]
    });
    // console.log(postData.user);
    const posts = postData.map((post) => {
        return post.get({
            plain: true
        });
    });
    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
        userId: req.session.userId
    });
});
router.get('/post/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: 'password'
                },

            }
        ]
    });
    const commentData = await Comment.findAll({
        where: {
            post_id: post.id
        },
        include: [{
            model: User,
            attributes: {
                exclude: 'password'
            }
        }]
    });
    res.render('post', {
        post,
        comments,
        logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {
    console.log(req.session.logged_in);
    if (req.session.logged_in) {
        res.redirect('/home');
    }
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;