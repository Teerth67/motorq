const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  lastRequest: { type: Date, required: true, default: Date.now }, // Default to now
  count: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('RateLimit', rateLimitSchema);
