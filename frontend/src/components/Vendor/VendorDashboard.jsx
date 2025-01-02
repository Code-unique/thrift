import { useState, useEffect } from 'react';
import API from '../../utils/api';
import VendorProductList from './VendorProductList';
import VendorOrderList from './VendorOrderList';

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const productResponse = await API.get('/api/products', { params: { vendor: localStorage.getItem('userId') } });
        const orderResponse = await API.get(`/api/orders/vendor/${localStorage.getItem('userId')}`);
        setProducts(productResponse.data);
        setOrders(orderResponse.data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchVendorData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <VendorProductList products={products} />
      <VendorOrderList orders={orders} />
    </div>
  );
};

export default VendorDashboard;
