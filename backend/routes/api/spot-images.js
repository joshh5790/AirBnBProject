const express = require('express')
const router = express.Router()
const { SpotImage } = require('../../db/models')

router.delete('/:spotImageId', async (req, res) => {
    try {
        const currImg = await SpotImage.findByPk(req.params.spotImageId)
        await currImg.destroy()
        res.json({ message: "Successfully deleted" })
    } catch {
        res.json({ message: "Spot Image couldn't be found" })
    }
})

module.exports = router
