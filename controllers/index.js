const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homepage');

router.use('/api', apiRoutes);
//need to create home routes next
router.use('/', homeRoutes);

router.use((req, res) => {
    res.send("<h1> Wrong Route!<h1>");
})

module.exports = router;