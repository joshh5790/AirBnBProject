const express = require('express')
const router = express.Router()
const { Spot, ReviewImage, User } = require('../../db/models')

// Retrieves all current user's reviews
router.get('/current', async (req, res) => {
    res.json()
})
