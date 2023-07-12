const express = require('express')
const router = express.Router()
const { Spot, SpotImage, User } = require('../../db/models')
const { DECIMAL, FLOAT } = require('sequelize')

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

// get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll()
    res.json(allSpots)
})

// create a new spot, still needs error msgs
router.post('/', async (req, res) => {
    const { ownerId, address, city, state,
        country, lat, lng,
        name, description, price } = req.body

    const owner = await User.findByPk(ownerId)
    try {

        const newSpot = await Spot.create({
            ownerId: owner.id,
            address, city, state,
            country, lat, lng,
            name, description, price
        })
        res.status(201).json(newSpot)
    } catch {
        const errors = {}
        if (!address) errors.address = 'Street address is required'
        if (!city) errors.city = 'City is required'
        if (!state) errors.state = 'State is required'
        if (!country) errors.country = 'Country is required'
        if (isNaN(parseFloat(lat))) errors.lat = "Latitude is not valid"
        if (isNaN(parseFloat(lng))) errors.lng = "Longitude is not valid"
        if (name.length > 50) errors.name = 'Name must be less than 50 characters'
        if (!description) errors.description = 'Description is required'
        if (!price) errors.price = 'Price per day is required'

        res.status(400)
        .json({
            message: "Bad Request",
            errors
        })
    }
})

router.post('/:spotId/images', async (req, res) => {
    const { url, preview } = req.body
    let currSpot
    try {
        currSpot = await Spot.findByPk(req.params.spotId)
    } catch {
        res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
    const spotImg = await SpotImage.create({
        url, preview, spotId: currSpot.id
    })
    res.json({
        id: spotImg.id,
        url: spotImg.url,
        preview: spotImg.preview
    })
})


module.exports = router
