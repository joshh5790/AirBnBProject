// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/users', require('./users'))
router.use('/session', require('./session'))
router.use('/spots', require('./spots'))
router.use('/reviews', require('./reviews'))

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
