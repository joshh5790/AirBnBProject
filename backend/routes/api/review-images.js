const express = require('express')
const router = express.Router()
const { ReviewImage, Review } = require('../../db/models')

router.delete('/:reviewImageId', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currImg = await ReviewImage.findByPk(req.params.reviewImageId)
    if (!currImg) return res.status(404).json({ message: "Review Image couldn't be found" })
    const currReview = await Review.findByPk(currImg.reviewId)
    if (user.id !== currReview.userId) return res.status(403).json({ message: "Forbidden" })

    await currImg.destroy()
    res.json({ message: "Successfully deleted" })
})

module.exports = router
