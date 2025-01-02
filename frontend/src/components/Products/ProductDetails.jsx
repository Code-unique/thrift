import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../utils/api';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold mt-4">${product.price}</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
