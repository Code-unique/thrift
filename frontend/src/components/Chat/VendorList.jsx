const VendorList = ({ vendors, onSelectVendor }) => (
  <ul>
    {vendors.map((vendor) => (
      <li
        key={vendor._id}
        onClick={() => onSelectVendor(vendor)}
        className="p-2 cursor-pointer hover:bg-gray-300 rounded"
      >
        {vendor.name}
      </li>
    ))}
  </ul>
);

export default VendorList;
