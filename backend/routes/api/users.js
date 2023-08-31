const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')


const validateSignup = [
    check('firstName')
        .exists()
        .isLength({ min: 1, max: 30 })
        .withMessage('First Name is required'),
    check('lastName')
        .exists()
        .isLength({ min: 1, max: 30 })
        .withMessage('Last Name is required'),
    check('username')
        .exists({ checkFalsy: true})
        .isLength({ min: 1, max: 30 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('username')
        .custom(async value => {
            const existingUser = await User.findOne({ where: { username: value }})
            if (existingUser) throw new Error("User with that username already exists")
            return true
        })
        .withMessage('User with that username already exists'),
    check('email')
        .exists({ checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('email')
        .custom(async value => {
            const existingUser = await User.findOne({ where: { email: value }})
            if (existingUser) throw new Error("User with that email already exists")
            return true
        })
        .withMessage('User with that email already exists'),
    check('password')
        .exists({ checkFalsy: true})
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]


// sign up!
router.post('/', validateSignup, async (req, res) => {
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

// edit user information
router.put('/edit', validateSignup, async (req, res) => {
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })

    const currUser = await User.findByPk(user.id)

    const { firstName, lastName, email, password, username } = req.body
    const hashedPassword = bcrypt.hashSync(password)

    await currUser.update({ firstName, lastName, email, hashedPassword, username })

    const safeUser = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        id: currUser.id,
        email: currUser.email,
        username: currUser.username
    }

    res.json({ user: safeUser})
})

module.exports = router
