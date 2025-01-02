import { useState, useEffect } from 'react';
import API from '../../utils/api';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await API.get(`/api/wishlist/${localStorage.getItem('userId')}`);
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    try {
      await API.delete(`/api/wishlist/${localStorage.getItem('userId')}/${productId}`);
      setWishlist((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p._id !== productId),
      }));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!wishlist) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.products.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>${product.price}</p>
              </div>
              <button
                onClick={() => removeItem(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
