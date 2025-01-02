const VendorProductList = ({ products }) => (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  export default VendorProductList;
  