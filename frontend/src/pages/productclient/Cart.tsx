import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get('/client/cart');
        setCart(response.data);
      } catch (err) {
        setError('Failed to fetch cart data');
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      const response = await axiosInstance.delete('/client/cart');
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    //     data: { productId },
    //   });
      setCart(response.data);
    } catch (err) {
      setError('Failed to remove product from cart');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {cart && (
        <div>
          <h1>Your Cart</h1>
          <ul>
            {cart.products.map((item: any) => (
              <li key={item.product._id}>
                {item.product.name} - Quantity: {item.quantity}
                <button onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;
