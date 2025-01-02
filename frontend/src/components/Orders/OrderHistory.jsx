import { useState, useEffect } from 'react';
import API from '../../utils/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get(`/api/orders/${localStorage.getItem('userId')}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded shadow"
            >
              <h3 className="font-bold">Order #{order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              <p>Items: {order.products.map((p) => p.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
