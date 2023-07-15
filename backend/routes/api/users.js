const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const validateSignup = [
    check('firstName')
        .exists()
        .withMessage('First Name is required'),
    check('lastName')
        .exists()
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true})
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true})
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]


// sign up!
router.post('/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body
    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({ firstName, lastName, email, username, hashedPassword })

    const safeUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        username: user.username
    }

    await setTokenCookie(res, safeUser)

    res.json({ user: safeUser })
})

module.exports = router
