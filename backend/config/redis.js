const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL);

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = client;
