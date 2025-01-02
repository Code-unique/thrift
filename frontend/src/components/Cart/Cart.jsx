import { useState, useEffect } from 'react';
import API from '../../utils/api';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get(`/api/cart/${localStorage.getItem('userId')}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await API.delete(`/api/cart/${localStorage.getItem('userId')}/${productId}`);
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter((p) => p._id !== productId),
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.products.map((product) => (
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

export default Cart;
