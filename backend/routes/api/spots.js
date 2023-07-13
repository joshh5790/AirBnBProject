const express = require('express')
const router = express.Router()
const { Spot, SpotImage, User, Review, ReviewImage, Sequelize } = require('../../db/models')

const checkSpotAttributes = (address, city, state, country, lat, lng, name, description, price) => {
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
    return errors
}

// retrieves all reviews for a spot
router.get('/:spotId/reviews', async (req, res) => {
    try {
        const currSpot = await Spot.findByPk(req.params.spotId)
        const spotReviews = await Review.findAll({
            where: { spotId: currSpot.id },
            include: [
                { model: User },
                { model: ReviewImage }
            ]
        })
        res.json(spotReviews)
    } catch {
        res.status(404).json({ message: "Spot couldn't be found" })
    }
})

// retrieves all spots owned by current user
router.get('/current', async (req, res) => {
    const { user } = req
    const userSpots = await Spot.findAll({
        where: { ownerId: user.dataValues.id }
    })
    res.json(userSpots)
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
        res.status(404).json({ message: "Spot couldn't be found"})
    }
})

// edit a spot
router.put('/:spotId', async (req, res) => {
    const {
        address, city, state,
        country, lat, lng,
        name, description, price
    } = req.body
    const currSpot = await Spot.findByPk(req.params.spotId)
    try {
        await currSpot.update({
            address, city, state,
            country, lat, lng,
            name, description, price
        })
        res.json(currSpot)
    } catch {
        if (!currSpot) res.status(404).json({ message: "Spot couldn't be found"})
        const errors = checkSpotAttributes(address, city, state, country, lat, lng, name, description, price)
        res.status(400).json({
            message: "Bad Request",
            errors
        })
    }
})

// get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll()
    res.json(allSpots)
})

// Create a review for a spot
router.post('/:spotId/reviews', async (req, res) => {
    const { review, stars } = req.body
    const { user } = req
    const currSpot = await Spot.findByPk(req.params.spotId)
    try {
        const currUser = await User.findByPk(user.dataValues.id)
        const newReview = await Review.create({
            userId: currUser.id,
            spotId: currSpot.id,
            review, stars
        })
        res.json(newReview)
    } catch(error) {
        if (!currSpot) res.status(404).json({ message: "Spot couldn't be found"})
        if (error instanceof Sequelize.UniqueConstraintError) {
            res.status(500).json({ message: "User already has a review for this spot" })
        }
        const errors = {}
        const rating = parseInt(stars)
        if (!review) errors.review = "Review text is required"
        if (rating > 5 || rating < 1) errors.stars = "Stars must be an integer from 1 to 5"
        if (errors.review || errors.stars) {
            res.status(400).json({
                message: "Bad Request",
                errors
            })
        }
    }
})

// create a new image for a spot
router.post('/:spotId/images', async (req, res) => {
    const { url, preview } = req.body
    let currSpot
    try {
        currSpot = await Spot.findByPk(req.params.spotId)
        const spotImg = await SpotImage.create({
            url, preview, spotId: currSpot.id
        })
        res.json({
            id: spotImg.id,
            url: spotImg.url,
            preview: spotImg.preview
        })
    } catch {
        res.status(404)
        if (!currSpot) {
            res.json({
                message: "Spot couldn't be found"
            })
        }
        else {
            res.json({
                message: "Invalid image url"
            })
        }
    }
})

// create a new spot
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
        const errors = checkSpotAttributes(address, city, state, country, lat, lng, name, description, price)
        res.status(400)
        .json({
            message: "Bad Request",
            errors
        })
    }
})

// deletes a spot
router.delete('/:spotId', async (req, res) => {
    try {
        const currSpot = await Spot.findByPk(req.params.spotId)
        await currSpot.destroy()
        res.json({
            message: "Successfully deleted"
        })
    } catch {
        res.status(404).json({
            message: "Spot couldn't be found"
        })
    }
})


module.exports = router
