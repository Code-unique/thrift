const Order = require('../models/Order');
const Product = require('../models/Product');

const recommendProducts = async (userId) => {
  const userOrders = await Order.find({ user: userId }).populate('products');
  const orderedProductIds = userOrders.flatMap((order) => order.products.map((p) => p._id.toString()));

  const otherOrders = await Order.find({ user: { $ne: userId } }).populate('products');
  const recommendedProducts = otherOrders.flatMap((order) =>
    order.products.filter((p) => !orderedProductIds.includes(p._id.toString()))
  );

  return Array.from(new Set(recommendedProducts));
};

module.exports = recommendProducts;
