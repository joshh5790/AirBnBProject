// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");
const reviews = require('./reviews')

router.use(restoreUser);

router.use('/users', require('./users'))
router.use('/session', require('./session'))
router.use('/spots', require('./spots'))
router.use('/reviews', reviews.router)

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
