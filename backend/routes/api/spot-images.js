const express = require('express')
const router = express.Router()
const { SpotImage, Spot } = require('../../db/models')

router.delete('/:spotImageId', async (req, res) => {
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })
    const currImg = await SpotImage.findByPk(req.params.spotImageId)
    const currSpot = await Spot.findByPk(currImg.spotId)
    if (user.id !== currSpot.ownerId) res.status(403).json({ message: "Forbidden" })

    await currImg.destroy()
    res.json({ message: "Successfully deleted" })
    res.json({ message: "Spot Image couldn't be found" })
})

module.exports = router
