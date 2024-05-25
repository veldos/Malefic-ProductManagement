import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file
import axiosInstance from '../../utils/axios';
import LoadingSpinner from '../../components/loading';
import ErrorMessage from '../../components/error';
interface Product {
  _id: string;
  id_Prod: number;
  Name: string;
  Description: string;
  Price: number;
  Category: string;
  Brand: string;
  Stock: number;
  Images: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get<Product[]>('/products');
        console.log('Products fetched:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <Link to="/product/create" className="add-product-link">
        Add New Product
      </Link>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`} className="product-link">
              <div className="product-image">
                <img src={product.Images} alt={product.Name} />
              </div>
              <div className="product-details">
                <h3>{product.Name}</h3>
                <p>Price: ${product.Price.toFixed(2)}</p>
                <p>Category: {product.Category}</p>
                <p className={product.Stock > 0 ? 'in-stock' : 'out-of-stock'}>
                  {product.Stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;