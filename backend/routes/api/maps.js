const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');

router.post('/key', (req, res) => {
  return res.json({ googleMapsAPIKey });
});

module.exports = router;
