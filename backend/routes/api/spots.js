const express = require('express')
const router = express.Router()
const { Spot, SpotImage, User, Review, ReviewImage, Sequelize } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')


const validateSpot = [
    check('address')
        .exists({ checkFalsy: true})
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true})
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true})
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true})
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true})
        .isNumeric()
        .withMessage('Latitude is not valid'),
        check('lng')
        .exists({ checkFalsy: true})
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true})
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true})
        .isNumeric()
        .withMessage('Price per day is required'),
    handleValidationErrors
]

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
router.put('/:spotId', validateSpot, async (req, res, next) => {
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
router.post('/', validateSpot, async (req, res, next) => {
    const { address, city, state,
        country, lat, lng,
        name, description, price } = req.body
    const { user } = req
    const currUser = await User.findByPk(user.dataValues.id)

    const newSpot = await Spot.create({
        ownerId: currUser.id,
        address, city, state,
        country, lat, lng,
        name, description, price
    })
    res.status(201).json(newSpot)
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
