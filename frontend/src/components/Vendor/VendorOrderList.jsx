const VendorOrderList = ({ orders }) => (
    <div>
      <h2 className="text-xl font-bold mt-8 mb-4">Orders for Your Products</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">Order #{order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              <p>Products: {order.products.map((p) => p.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  export default VendorOrderList;
  