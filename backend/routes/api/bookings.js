const express = require('express')
const router = express.Router()
const { Spot, Booking } = require('../../db/models')
const { Op } = require('sequelize')

// gets all of current user's bookings
router.get('/current', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const userBookings = await Booking.findAll({
        where: { userId: user.id },
        include: { model: Spot,
            attributes: {
                exclude: ['description', 'numReviews', 'avgRating', 'createdAt', 'updatedAt']
            }
        }
    })
    res.json({ Bookings: userBookings })
})

// edit a booking by bookingId
router.put('/:bookingId', async (req, res) => {
    // checks for valid booking
    const currBooking = await Booking.findByPk(req.params.bookingId)
    if (!currBooking) return res.status(404).json({ message: "Booking couldn't be found" })
    const { user } = req
    if (user.id !== currBooking.userId) return res.status(403).json({ message: "Forbidden" })

    // check if startDate is after endDate
    let { startDate, endDate } = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    if (startDate >= endDate) return res.status(400).json({
        message: "Bad Request",
        errors: {
            endDate: "endDate cannot be on or before startDate"
        }
    })

    // checks if booking is past end date
    const current = new Date()
    if (new Date(currBooking.endDate) < current) return res.status(403).json({ message: "Past bookings can't be modified" })

    // check for date conflicts
    const checkDateConflict = await Booking.findOne({
        where: {
            spotId: currBooking.spotId,
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } }
            ]
        }
    })
    if (checkDateConflict) return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
    })

    await currBooking.update({ startDate, endDate })
    res.json(currBooking)
})

// delete a booking
router.delete('/:bookingId', async (req, res) => {
    const { user } = req
    if (!user) return res.status(403).json({ message: "Forbidden" })
    const currBooking = await Booking.findByPk(req.params.bookingId)
    if (!currBooking) return res.status(404).json({ message: "Booking couldn't be found" })
    if (user.id !== currBooking.userId) return res.status(403).json({ message: "Forbidden" })
    const current = new Date()
    if (new Date(currBooking.endDate) < current) return res.status(403).json({ message: "Past bookings can't be deleted" })


    await currBooking.destroy()
    res.json({ message: "Successfully deleted" })
})

module.exports = router
