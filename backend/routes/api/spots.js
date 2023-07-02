const express = require('express')
const router = express.Router()
const { Spot, SpotImage, User } = require('../../db/models')

// get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll()
    res.json(allSpots)
})

// get details of a spot
router.get('/:spotId', async (req, res, next) => {
    const currSpot = await Spot.findOne({
        where: { id: req.params.spotId },
        include: [
            { model: SpotImage }
        ]
    })
    if (currSpot) res.json(currSpot)
    else {
        const err = new Error("Not a valid spot id")
        next(err)
    }
})
