const redis = require('../config/redis');

const cache = (req, res, next) => {
  const { productId } = req.params;

  redis.get(`product:${productId}`, (err, data) => {
    if (err) {
      console.error(err);
      return next();
    }

    if (data != null) {
      return res.json(JSON.parse(data));
    }

    next();
  });
};

module.exports = cache;
