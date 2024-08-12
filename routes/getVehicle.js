// routes/vehicleRoute.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle'); // Adjust the path if necessary

// Helper function to validate VIN
const isValidVin = (vin) => {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/; // VIN must be 17 alphanumeric characters (excluding I, O, Q)
  return vinRegex.test(vin);
};

// GET /vehicles/:vin - Fetch vehicle details by VIN
router.get('/vehicles/:vin', async (req, res) => {
  const vin = req.params.vin;

  // Validate VIN
  if (!isValidVin(vin)) {
    return res.status(400).json({ message: 'Invalid VIN format. VIN must be a 17-digit alphanumeric string.' });
  }

  try {
    // Find the vehicle by VIN
    const vehicle = await Vehicle.findOne({ vin }).populate('org'); // Populate org details if needed

    // Check if the vehicle exists
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    // Return the vehicle details
    res.status(200).json(vehicle);
  } catch (error) {
    // Handle errors
    console.error('Error fetching vehicle details:', error.message);
    res.status(500).json({ message: 'Error fetching vehicle details' });
  }
});

module.exports = router;
