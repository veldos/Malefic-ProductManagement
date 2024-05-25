import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { Box, Grid, Typography, Button } from '@mui/material';
import LoadingSpinner from '../../components/loading';

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

interface Params extends Record<string, string> {
  id: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get<Product>(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      // Redirect to the product list page or show a success message
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <Box px={4} py={8}>
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <img
              src={product.Images}
              alt={product.Name}
              style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.Name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price: ${product.Price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Category: {product.Category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Brand: {product.Brand}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Stock: {product.Stock}
          </Typography>
          <Box mt={2}>
            <Link to={`/product/edit/${id}`}>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              style={{ marginLeft: '8px' }}            >
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box mt={8}>
        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1">{product.Description}</Typography>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;