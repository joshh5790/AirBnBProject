const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
]

// login!
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    })

    if (!user ||
        !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('The provided credentials were invalid')
        err.status = 401
        return next(err)
    }

    const safeUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        username: user.username
    }

    await setTokenCookie(res, safeUser)

    return res.json({
        user: safeUser
    })
})

// logout!
router.delete('/', (req, res) => {
    res.clearCookie('token')
    return res.json({ message: 'success' })
})

// get session user!
router.get('/', (req, res) => {
    const { user } = req
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        }
        return res.json({ user: safeUser })
    } else return res.json({ user: null })
})



module.exports = router
