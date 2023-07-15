const express = require('express')
const router = express.Router()
const { Spot, Review, ReviewImage, User, Sequelize } = require('../../db/models')
const { ValidationError } = require('sequelize')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// Retrieves all current user's reviews
router.get('/current', async (req, res) => {
    const { user } = req
    const userReviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            { model: User },
            { model: Spot },
            { model: ReviewImage }
        ]
    })
    res.json(userReviews)
})

// Add image to review
router.post('/:reviewId/images', async (req, res) => {
    const { url } = req.body
    const currReview = await Review.findByPk(req.params.reviewId)
    try {
        const newImage = await ReviewImage.create({
            url, reviewId: currReview.id
        })
        res.json({
            id: newImage.id,
            url
        })
    } catch(error) {
        if (!currReview) res.status(404).json({ message: "Review couldn't be found" })
        if (error instanceof ValidationError) {
            res.json({ message: "Maximum number of images for this resource was reached"})
        }
    }
})

// Edit a review
router.put('/:reviewId', validateReview, async (req, res) => {
    const { review, stars } = req.body
    const currReview = await Review.findByPk(req.params.reviewId)
    try {
        currReview.update({
            review, stars
        })
        res.json(currReview)
    } catch {
        if (!currReview) res.status(404).json({ message: "Review couldn't be found" })
    }
})

router.delete('/:reviewId', async (req, res) => {
    try {
        const currReview = await Review.findByPk(req.params.reviewId)
        await currReview.destroy()
        res.json({
            message: "Successfully deleted"
        })
    } catch {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }
})

module.exports = {
    router,
    validateReview
}