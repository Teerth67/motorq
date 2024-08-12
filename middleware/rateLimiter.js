const rateLimit = require('express-rate-limit');


const nhtsaRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

module.exports = nhtsaRateLimiter;