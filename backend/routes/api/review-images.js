const express = require('express')
const router = express.Router()
const { ReviewImage } = require('../../db/models')

router.delete('/:reviewImageId', async (req, res) => {
    try {
        const currImg = await ReviewImage.findByPk(req.params.reviewImageId)
        await currImg.destroy()
        res.json({ message: "Successfully deleted" })
    } catch {
        res.json({ message: "Review Image couldn't be found" })
    }
})

module.exports = router
