const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vin: { type: String, required: true, unique: true },
  make: { type: String }, // Manufacturer fetched from NHTSA
  model: { type: String }, // Model fetched from NHTSA
  year: { type: Number }, // Year fetched from NHTSA
  org: { type: Schema.Types.ObjectId, ref: 'Org', required: true } // Reference to the organization
});

module.exports = mongoose.model('Vehicle', vehicleSchema);