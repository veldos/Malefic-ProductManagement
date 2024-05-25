import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
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

interface Params extends Record<string, string> {
  id: string;
}

const ProductEditPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get<Product>(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product data. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      try {
        await axiosInstance.put(`/product/update/${id}`, product);
        navigate('/products'); // Redirect to the product list page after successful update
      } catch (error) {
        console.error('Error updating product:', error);

      }
    }
  };

  if (!product) {
    return <LoadingSpinner/>;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="ID"
              name="id_Prod"
              value={product.id_Prod}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="Name"
              value={product.Name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="Description"
              value={product.Description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="Price"
              value={product.Price}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="Category"
              value={product.Category}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand"
              name="Brand"
              value={product.Brand}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              name="Stock"
              value={product.Stock}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Images"
              name="Images"
              value={product.Images}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#313336' }}>
              Update Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductEditPage;