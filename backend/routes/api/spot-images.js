const express = require('express')
const router = express.Router()
const { SpotImage, Spot } = require('../../db/models')

router.delete('/:spotImageId', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currImg = await SpotImage.findByPk(req.params.spotImageId)
    if (!currImg) return res.status(404).json({ message: "Spot Image couldn't be found"})
    const currSpot = await Spot.findByPk(currImg.spotId)
    if (user.id !== currSpot.ownerId) return res.status(403).json({ message: "Forbidden" })

    await currImg.destroy()
    res.json({ message: "Successfully deleted" })
})

router.put('/:spotImageId', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currImage = await SpotImage.findByPk(req.params.spotImageId)
    if (!currImage) return res.status(404).json({ message: "Image couldn't be found" })
    const currSpot = await Spot.findByPk(currImage.spotId)
    if (!currSpot) return res.status(404).json({ message: "Spot couldn't be found" })
    if (user.id !== currSpot.ownerId) return res.status(403).json({ message: "Forbidden" })
    const { url } = req.body

    currImage.update({ url })

    res.json(currImage)
})

module.exports = router
