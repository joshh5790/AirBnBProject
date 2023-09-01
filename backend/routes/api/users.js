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

const validateUpdate = [
    check('firstName')
        .optional()
        .isLength({ min: 1, max: 30 })
        .withMessage('First Name is required'),
    check('lastName')
        .optional()
        .isLength({ min: 1, max: 30 })
        .withMessage('Last Name is required'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('email')
        .optional()
        .custom(async value => {
            if (value) {
                const existingUser = await User.findOne({ where: { email: value }})
                if (existingUser) throw new Error("User with that email already exists")
            }
            return true
        })
        .withMessage('User with that email already exists'),
    check('password')
        .optional()
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
router.put('/:userId', validateUpdate, async (req, res) => {
    const { user } = req
    if (!user || user.id !== parseInt(req.params.userId)) res.status(403).json({ message: "Forbidden" })
    const currUser = await User.unscoped().findByPk(req.params.userId)
    const { firstName, lastName, email, oldPassword, newPassword } = req.body

    const updatedUser = {}
    if (firstName !== currUser.firstName) updatedUser.firstName = firstName
    if (lastName !== currUser.lastName) updatedUser.lastName = lastName
    if (email !== currUser.email) updatedUser.email = email


    let hashedPassword
    if (oldPassword && !bcrypt.compareSync(oldPassword, currUser.hashedPassword.toString())) {
        return res.status(400).json({['Old Password']: 'Password did not match old password.'})
    }
    if (newPassword) hashedPassword = bcrypt.hashSync(newPassword)

    updatedUser.hashedPassword = hashedPassword



    await currUser.update(updatedUser)

    const safeUser = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        id: currUser.id,
        email: currUser.email,
        username: currUser.username
    }

    await setTokenCookie(res, safeUser)

    res.json({ user: safeUser })
})

module.exports = router
