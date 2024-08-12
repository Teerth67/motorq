const express = require('express');
const axios = require('axios');
const Vehicle = require('../models/Vehicle');
const Org = require('../models/org');
const nhtsaRateLimiter = require('../middleware/rateLimiter');
const router = express.Router();

// Middleware to rate limit NHTSA API calls
router.use('/vehicles/decode/', nhtsaRateLimiter);

router.get('/vehicles/decode/:vin', async (req, res) => {
  const vin = req.params.vin;

  // Validate VIN
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
    return res.status(400).json({ error: 'Invalid VIN format' });
  }

  try {
    // Call to NHTSA API
    const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
    const { data } = response;

    // Log the raw response for debugging
    console.log('NHTSA Response:', data);

    // Extract relevant details
    const manufacturer = data.Results.find(item => item.Variable === 'Make')?.Value || 'N/A';
    const model = data.Results.find(item => item.Variable === 'Model')?.Value || 'N/A';
    const year = data.Results.find(item => item.Variable === 'Model Year')?.Value || 'N/A';

    // Respond with the relevant details
    res.json({
      manufacturer,
      model,
      year
    });
  } catch (error) {
    console.error('Error fetching vehicle details:', error.message);
    if (error.response && error.response.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
    } else {
      res.status(500).json({ error: 'Error fetching vehicle details' });
    }
  }
});

module.exports = router;