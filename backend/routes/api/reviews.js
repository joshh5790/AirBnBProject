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
    if (!user) res.status(403).json({ message: "Forbidden" })
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
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })
    const currReview = await Review.findByPk(req.params.reviewId)
    if (user.id !== currReview.userId) res.status(403).json({ message: "Forbidden" })

    const { url } = req.body
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
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })
    const currReview = await Review.findByPk(req.params.reviewId)
    if (user.id !== currReview.userId) res.status(403).json({ message: "Forbidden" })

    const { review, stars } = req.body
    try {
        currReview.update({
            review, stars
        })

        // update star rating for spot
        const currSpot = await Spot.findByPk(currReview.spotId)
        const sum = await Review.sum('stars', { where: { spotId: currSpot.id } })
        const count = await Review.count({ where: { spotId: currSpot.id } })
        const avgRating = Math.round(sum * 10 / count) / 10
        await currSpot.update({ avgRating })

        res.json(currReview)
    } catch {
        if (!currReview) res.status(404).json({ message: "Review couldn't be found" })
    }
})

router.delete('/:reviewId', async (req, res) => {
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })
    const currReview = await Review.findByPk(req.params.reviewId)
    const sum = await Review.sum('stars', { where: { spotId: currSpot.id } })
    const count = await Review.count({ where: { spotId: currSpot.id } })
    const avgRating = Math.round(sum * 10 / count) / 10
    await currSpot.update({ avgRating })
    if (user.id !== currReview.userId) res.status(403).json({ message: "Forbidden" })
    if (!currReview) res.status(404).json({ message: "Review couldn't be found" })

    await currReview.destroy()
    res.json({ message: "Successfully deleted" })
})

module.exports = {
    router,
    validateReview
}
