const express = require('express')
const router = express.Router()
const { Spot, Review, ReviewImage, User } = require('../../db/models')

// Retrieves all current user's reviews
router.get('/current', async (req, res) => {
    const { user } = req
    const userReviews = await Review.findAll({
        where: { userId: user.dataValues.id },
        include: [
            { model: User },
            { model: Spot },
            { model: ReviewImage }
        ]
    })
    res.json(userReviews)
})

module.exports = router
