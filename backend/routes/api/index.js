const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js')
const sessionRouter = require('./session.js')
const userRouter = require('./users.js')


router.use(restoreUser)
router.use('/session', sessionRouter)
router.use('/users', userRouter)

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
