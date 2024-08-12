// models/Org.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema({
  name: { type: String, required: true },
  account: { type: String, required: true },
  website: { type: String, required: true },
  fuelReimbursementPolicy: { type: String, default: '1000' },
  speedLimitPolicy: { type: String, required: true },
  parentOrg: { type: Schema.Types.ObjectId, ref: 'Org' } // Parent organization reference
});

module.exports = mongoose.model('Org', orgSchema);
