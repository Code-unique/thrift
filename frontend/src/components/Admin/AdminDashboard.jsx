import { useState, useEffect } from 'react';
import API from '../../utils/api';
import AdminUserList from './AdminUserList';
import AdminVendorList from './AdminVendorList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userResponse = await API.get('/api/users');
        const vendorResponse = await API.get('/api/vendors');
        setUsers(userResponse.data);
        setVendors(vendorResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminUserList users={users} />
      <AdminVendorList vendors={vendors} />
    </div>
  );
};

export default AdminDashboard;
