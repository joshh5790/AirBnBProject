const express = require('express')
const router = express.Router()
const { Spot, Booking, User, Sequelize } = require('../../db/models')
const { Op } = require('sequelize')

// gets all of current user's bookings
router.get('/current', async (req, res) => {
    const { user } = req
    const userBookings = await Booking.findAll({
        where: { userId: user.id },
        include: { model: Spot }
    })
    res.json(userBookings)
})

router.put('/:bookingId', async (req, res) => {
    // check if startDate is after endDate
    const { startDate, endDate } = req.body
    if (startDate >= endDate) res.status(400).json({
        message: "Bad Request",
        errors: {
            endDate: "endDate cannot be on or before startDate"
        }
    })

    // checks for valid booking
    const currBooking = await Booking.findByPk(req.params.bookingId)
    if (!currBooking) res.status(404).json({ message: "Booking couldn't be found" })

    // checks if booking is past end date
    const current = new Date()
    if (currBooking.endDate < current) res.status(403).json({ message: "Past bookings can't be modified" })

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
    if (checkDateConflict) res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
    })

    await currBooking.update({ startDate, endDate })
    res.json(currBooking)
})

router.delete('/:bookingId', async (req, res) => {
    try {
        const currBooking = await Booking.findByPk(req.params.bookingId)
        await currBooking.destroy()
        res.json({
            message: "Successfully deleted"
        })
    } catch {
        res.status(404).json({
            message: "Booking couldn't be found"
        })
    }
})

module.exports = router
