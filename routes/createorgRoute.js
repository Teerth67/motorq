// routes/orgRoute.js
const express = require('express');
const router = express.Router();
const Org = require('../models/org'); // Adjust the path if necessary

// POST /orgs - Create a new organization
router.post('/orgs', async (req, res) => {
  const { name, account, website, fuelReimbursementPolicy, speedLimitPolicy ,parentOrg} = req.body;

  // Validate required fields
  if (!name || !account || !website || !speedLimitPolicy) {
    return res.status(400).json({ message: 'Name, account, website, and speedLimitPolicy are required.' });
  }

  try {
    // Create a new organization
    const newOrg = new Org({
      name,
      account,
      website,
      fuelReimbursementPolicy: fuelReimbursementPolicy || '1000', // Set default value if not provided
      speedLimitPolicy,
      parentOrg:parentOrg||"null"
    });

    // Save the organization to the database
    const savedOrg = await newOrg.save();
    
    // Return success response
    res.status(201).json(savedOrg);
  } catch (error) {
    // Handle errors
    console.error('Error creating organization:', error.message);
    res.status(400).json({ message: 'Error creating organization' });
  }
});

module.exports = router;
