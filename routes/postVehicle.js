const express = require('express');
const axios = require('axios');
const Vehicle = require('../models/Vehicle');
const Org = require('../models/org');
const router = express.Router();

// Helper function to validate VIN
function isValidVin(vin) {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin); // 17-character alphanumeric, excluding I, O, Q
}

// POST /vehicles endpoint
router.post('/vehicles', async (req, res) => {
  const { vin, org } = req.body;

  // Validate request body
  if (!vin || !org || !isValidVin(vin)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Check if the orgId exists
    const organization = await Org.findById(org);
    if (!organization) {
      return res.status(400).json({ message: 'Organization not found' });
    }

    // Decode VIN using NHTSA API
    const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
    const { data } = response;

    let manufacturer = 'N/A';
    let model = 'N/A';
    let year = 'N/A';

    if (data.Results) {
      data.Results.forEach(item => {
        if (item.Variable === 'Make') {
          manufacturer = item.Value || 'N/A';
        }
        if (item.Variable === 'Model Year') {
          year = item.Value || 'N/A';
        }
        if (item.Variable === 'Model') {
          model = item.Value || 'N/A';
        }
      });
    }

    // Create new vehicle record
    const vehicle = new Vehicle({
      vin,
      make: manufacturer,
      model,
      year: parseInt(year, 10),
      org
    });

    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error.message);
    res.status(500).json({ message: 'Error creating vehicle' });
  }
});

module.exports = router;
