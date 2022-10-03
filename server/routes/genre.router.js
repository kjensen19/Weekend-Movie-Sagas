const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  //handled these with the movie router
  // Add query to get all genres
  res.sendStatus(500)
});

module.exports = router;