import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/api/products', {
          params: { keyword: search, category },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  const viewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-1/4"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => viewDetails(product._id)}
            >
              <img
                src={product.image || '/placeholder.png'}
                alt={product.name}
                className="h-40 w-full object-cover mb-2"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price}</p>
              <p className="text-gray-600">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
