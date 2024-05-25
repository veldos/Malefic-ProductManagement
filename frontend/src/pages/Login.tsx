import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Backgoudimage from '../images/Back.png'
const Container = styled.div`
  height: 99vh;
  width: 100%; /* Ensures full width */
  border-bottom: 1px solid; /* Assuming theme object for colors */
  position: relative;
`;

const StyledGrid = styled(Grid)`
  background-image: url(${Backgoudimage});
  background-size: cover; /* Adjust the background size as needed */
  background-position: center; 
  display: flex; /* Allow for flexbox layout */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  height: 100vh; /* Set full viewport height (optional) */
`;

const defaultTheme = createTheme({
  palette:{
    primary:{
      main: '#a3a4a7',
    }
  }
});

const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/products'); // Redirect to a protected route after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>

    <Container>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <StyledGrid item  xs={false}sm={4}    md={7} />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={20} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              marginTop: 20 ,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#313336' }}>
              <LockOutlinedIcon sx={{ color: '#C5C7CB' }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              {error && <Typography color="error">{error}</Typography>}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </ThemeProvider>

  );
};

export default Login;