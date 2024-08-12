// routes/orgRoute.js
const express = require('express');
const router = express.Router();
const Org = require('../models/org'); // Adjust the path if necessary

// GET /orgs - Retrieve all organizations
router.get('/orgs', async (req, res) => {
  try {
    // Retrieve all organizations and populate parentOrg details
    const organizations = await Org.find().populate('parentOrg').exec();

    // Return success response with organizations data
    res.status(200).json(organizations);
  } catch (error) {
    // Handle errors
    console.error('Error retrieving organizations:', error.message);
    res.status(400).json({ message: 'Error retrieving organizations' });
  }
});

module.exports = router;
