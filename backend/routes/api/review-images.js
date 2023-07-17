const express = require('express')
const router = express.Router()
const { ReviewImage, Review } = require('../../db/models')

router.delete('/:reviewImageId', async (req, res) => {
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })
    const currImg = await ReviewImage.findByPk(req.params.reviewImageId)
    const currReview = await Review.findByPk(currImg.reviewId)
    if (user.id !== currReview.userId) res.status(403).json({ message: "Forbidden" })
    if (!currImg) res.status(404).json({ message: "Review Image couldn't be found" })

    await currImg.destroy()
    res.json({ message: "Successfully deleted" })
})

module.exports = router
