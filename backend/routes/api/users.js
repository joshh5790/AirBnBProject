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
    check('email')
        .exists({ checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true})
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
]

// check('username')
// .custom(async value => {
//     const existingUser = await User.findOne({ where: { username: value }})
//     if (existingUser) throw new Error("User with that name already exists")
//     return true
// })
// .withMessage('User already exists'),


// sign up!
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body
    const hashedPassword = bcrypt.hashSync(password)

    const existingEmail = await User.findOne({ where: { email }})
    if (existingEmail) res.status(500).json({
        message: "User already exists",
        errors: { email: "User with that email already exists" }
    })
    const existingUsername = await User.findOne({ where: { username }})
    if (existingUsername) res.status(500).json({
        message: "User already exists",
        errors: { email: "User with that username already exists" }
    })


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

router.get('/', async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

module.exports = router
