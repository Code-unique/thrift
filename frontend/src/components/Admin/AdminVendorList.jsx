const AdminVendorList = ({ vendors }) => (
    <div>
      <h2 className="text-xl font-bold mt-8 mb-4">Manage Vendors</h2>
      {vendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{vendor.name}</h3>
              <p>{vendor.email}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete Vendor
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  export default AdminVendorList;
  