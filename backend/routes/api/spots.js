const express = require('express')
const router = express.Router()
const { Spot, SpotImage, User } = require('../../db/models')

// get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll()
    res.json(allSpots)
})

// get details of a spot
router.get('/:spotId', async (req, res) => {
    const currSpot = await Spot.findOne({
        where: { id: req.params.spotId },
        include: [
            { model: SpotImage },
            { model: User, as: "Owner" }
        ]
    })
    if (currSpot) res.json(currSpot)
    else {
        res.status(400)
        res.json({ message: "Spot couldn't be found"})
    }
})

// create a new spot, still needs error msgs
router.post('/', async (req, res) => {
    const { ownerId, address, city, state,
        country, lat, lng,
        name, description, price } = req.body

    const owner = await User.findByPk(ownerId)
    const newSpot = await owner.createSpot({
        address, city, state,
        country, lat, lng,
        name, description, price
    })

    res.json(newSpot)
})

module.exports = router
