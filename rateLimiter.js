const RateLimit = require('./models/Ratelimit'); // Adjust path as needed

async function rateLimiter(key) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_DURATION;

  try {
    let rateLimit = await RateLimit.findOne({ key });

    if (!rateLimit) {
      // If no record exists, create a new one
      rateLimit = new RateLimit({
        key,
        lastRequest: now,
        count: 1
      });
    } else {
      if (rateLimit.lastRequest < windowStart) {
        // Reset count if time window has passed
        rateLimit.lastRequest = now;
        rateLimit.count = 1;
      } else {
        // Increment count within the time window
        rateLimit.count += 1;
      }

      if (rateLimit.count > RATE_LIMIT_POINTS) {
        throw new Error('Rate limit exceeded');
      }
    }

    await rateLimit.save();
  } catch (error) {
    throw new Error('Rate limiting error: ' + error.message);
  }
}
