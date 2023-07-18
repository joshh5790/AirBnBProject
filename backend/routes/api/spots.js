const express = require('express')
const router = express.Router()
const { Spot, SpotImage, User, Booking, Review, ReviewImage, Sequelize } = require('../../db/models')
const { check, query } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const reviews = require('./reviews')
const { Op } = require('sequelize')


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
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true})
        .isNumeric()
        .isFloat({ min: -180, max: 180 })
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

const validateQuery = [
    query('page')
        .optional()
        .isInt({ min: 1, max: 10})
        .withMessage("Page must be greater than or equal to 1"),
    query('size')
        .optional()
        .isInt({ min: 1, max: 20})
        .withMessage("Size must be greater than or equal to 1"),
    query('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Maximum latitude is invalid"),
    query('minLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Minimum latitude is invalid"),
    query('minLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Maximum longitude is invalid"),
    query('maxLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Minimum longitude is invalid"),
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
]

// retrieves all reviews for a spot
router.get('/:spotId/reviews', async (req, res) => {
    try {
        const currSpot = await Spot.findByPk(req.params.spotId)
        const spotReviews = await Review.findAll({
            where: { spotId: currSpot.id },
            include: [
                { model: User,
                    attributes: {
                        exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                    }
                },
                { model: ReviewImage,
                    attributes: {
                        exclude: ['preview', 'reviewId', 'createdAt', 'updatedAt']
                    }
                }
            ]
        })
        res.json(spotReviews)
    } catch {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
})

// retrives all bookings for a spot
router.get('/:spotId/bookings', async (req, res) => {
    const { user } = req

    try {
        const currSpot = await Spot.findByPk(req.params.spotId)
        let spotBookings
        if (currSpot.ownerId === user.id) {
            spotBookings = await Booking.findAll({
                where: { spotId: currSpot.id },
                include: { model: User,
                    attributes: { exclude: ['username','email', 'hashedPassword', 'createdAt', 'updatedAt'] }
                }
            })
        } else {
            spotBookings = await Booking.findAll({
                where: { spotId: currSpot.id },
                attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
            })
        }
        res.json({ Bookings: spotBookings })
    } catch {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }
})

// retrieves all spots owned by current user
router.get('/current', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const userSpots = await Spot.findAll({
        where: { ownerId: user.id },
        attributes: { exclude: ['numReviews'] }
    })
    res.json({ Spots: userSpots })
})

// get details of a spot
router.get('/:spotId', async (req, res) => {
    const currSpot = await Spot.findOne({
        where: { id: req.params.spotId },
        include: [
            { model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }},
            { model: User, as: "Owner",
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                },
            }
        ],
        attributes: { exclude: ['previewImage', 'createdAt', 'updatedAt'] }
    })
    if (currSpot) res.json(currSpot)
    else {
        res.status(404).json({ message: "Spot couldn't be found"})
    }
})

// edit a spot
router.put('/:spotId', validateSpot, async (req, res, next) => {

    // checks if owner is logged in
    const { user } = req
    if (!user) res.status(403).json({ message: "Forbidden" })
    const currSpot = await Spot.findOne({
        where:{ id: req.params.spotId },
        attributes: { exclude: ['previewImage', 'avgRating', 'numReviews'] }
    })
    if (!currSpot) res.status(404).json({ message: "Spot couldn't be found"})
    if (user.id !== currSpot.ownerId) res.status(403).json({ message: "Forbidden" })

    const {
        address, city, state,
        country, lat, lng,
        name, description, price
    } = req.body
    await currSpot.update({
        address, city, state,
        country, lat, lng,
        name, description, price
    })
    res.json(currSpot)
})

// get all spots
router.get('/', validateQuery, async (req, res) => {
    let { page, size, minLat, maxLat,
        minLng, maxLng, minPrice, maxPrice } = req.query
    page = page || 1
    size = size || 20
    minLat = minLat || -90
    maxLat = maxLat || 90
    minLng = minLng || -180
    maxLng = maxLng || 180
    minPrice = minPrice || 0
    maxPrice = maxPrice || 99999


    // how do I do a conditional Op.between only if the two things are defined?
    const allSpots = await Spot.findAll({
        where: {
            lat: { [Op.between]: [minLat, maxLat] },
            lng: { [Op.between]: [minLng, maxLng] },
            price: { [Op.between]: [minPrice, maxPrice] }
        },
        attributes: { exclude: ['numReviews'] },
        offset: size * (page - 1),
        limit: size
    })
    // console.log(allSpots[0].createdAt)
    // for (const spot of allSpots) {
    //     const currCreate = spot.createdAt.slice(0,19).replace('T', ' ')
    //     const currUpdate = spot.updatedAt.slice(0,19).replace('T', ' ')
    //     await spot.update({
    //         createdAt: currCreate,
    //         updatedAt: currUpdate
    //     })
    // }
    // // for (let i = 0; i < allSpots.length; i++) {
    // //     const currCreate = allSpots[i].createdAt.slice(0,19)
    // //     const currUpdate = allSpots[i].updatedAt.slice(0,19)
    // //     console.log(currCreate)
    // //     allSpots[i].createdAt = currCreate
    // //     allSpots[i].updatedAt = currUpdate
    // // }
    // console.log(allSpots[0].createdAt)
    res.json({ Spots: allSpots })
})

// Creates a booking for a spot
router.post('/:spotId/bookings', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    let { startDate, endDate } = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    // check if startDate is after endDate
    if (startDate >= endDate) res.status(400).json({
        message: "Bad Request",
        errors: {
            endDate: "endDate cannot be on or before startDate"
        }
    })

    // checks for valid spot
    const currSpot = await Spot.findByPk(req.params.spotId)
    if (!currSpot) return res.status(404).json({ message: "Spot couldn't be found"})

    // check for date conflicts
    const checkDateConflict = await Booking.findOne({
        where: {
            spotId: currSpot.id,
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } }
            ]
        }
    })
    if (checkDateConflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
              }
        })
    }

    const currUser = await User.findByPk(user.id)
    const newBooking = await Booking.create({
        spotId: currSpot.id,
        userId: currUser.id,
        startDate, endDate
    })
    res.json(newBooking)

})

// Create a review for a spot
router.post('/:spotId/reviews', reviews.validateReview, async (req, res) => {
    const { review, stars } = req.body
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currSpot = await Spot.findByPk(req.params.spotId)
    if (!currSpot) return res.status(404).json({ message: "Spot couldn't be found"})
    if (user.id === currSpot.ownerId) return res.status(400).json({ message: "Can't create a review for your own property!" })
    try {
        const currUser = await User.findByPk(user.id)
        const newReview = await Review.create({
            userId: currUser.id,
            spotId: currSpot.id,
            review, stars
        })

        // update star rating for spot
        const sum = await Review.sum('stars', { where: { spotId: currSpot.id } })
        const count = await Review.count({ where: { spotId: currSpot.id } })
        const avgRating = Math.round(sum * 10 / count) / 10
        const numReviews = currSpot.numReviews + 1
        await currSpot.update({ avgRating, numReviews })

        res.json(newReview)
    } catch(error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            return res.status(500).json({ message: "User already has a review for this spot" })
        }
    }
})

// create a new image for a spot
router.post('/:spotId/images', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currSpot = await Spot.findByPk(req.params.spotId)
    if (!currSpot) return res.status(404).json({ message: "Spot couldn't be found" })
    if (user.id !== currSpot.ownerId) return res.status(403).json({ message: "Forbidden" })
    const { url, preview } = req.body

    try {
        const spotImg = await SpotImage.create({
            url, preview, spotId: currSpot.id
        })
        res.json({
            id: spotImg.id,
            url: spotImg.url,
            preview: spotImg.preview
        })
    } catch {
        return res.status(404).json({ message: "Invalid image url" })
    }
})

// create a new spot
router.post('/', validateSpot, async (req, res, next) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })

    const { address, city, state,
        country, lat, lng,
        name, description, price } = req.body
    const currUser = await User.findByPk(user.id)

    const newSpot = await Spot.create({
        ownerId: currUser.id,
        address, city, state,
        country, lat, lng,
        name, description, price
    })
    return res.status(201).json(newSpot)
})

// deletes a spot
router.delete('/:spotId', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currSpot = await Spot.findByPk(req.params.spotId)
    if (!currSpot) return res.status(404).json({ message: "Spot couldn't be found" })
    if (user.id !== currSpot.ownerId) return res.status(403).json({ message: "Forbidden" })

    await currSpot.destroy()
    res.json({
        message: "Successfully deleted"
    })
})


module.exports = router
