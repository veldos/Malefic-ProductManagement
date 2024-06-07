import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id_Prod: '',
    Name: '',
    Description: '',
    Price: 0,
    Category: '',
    Brand: '',
    Stock: 0,
    Images: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post('/product/create', product)
      .then((response) => {
        console.log('Product created: ', response.data);
      })
      .catch((error) => {
        console.error('Error Creating product', error);
      });
    navigate('/products');
  };

  return (
    <Container maxWidth="md" style={{ padding: '37px' }}>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Create Product
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="Name"
                value={product.Name}
                onChange={handleChange}
                fullWidth
                required
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
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="Price"
                value={product.Price}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="Category"
                value={product.Category}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                name="Brand"
                value={product.Brand}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                name="Stock"
                value={product.Stock}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Images"
                name="Images"
                value={product.Images}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ bgcolor: '#313336' }}
              >
                Create Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProduct;
