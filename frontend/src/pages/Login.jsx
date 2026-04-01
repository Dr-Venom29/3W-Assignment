import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { loginUser } from '../services/api';
import toast from 'react-hot-toast';

export default function Login({ onAuthSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Login successful');
        if (onAuthSuccess) onAuthSuccess();
        navigate('/');
      } else {
        toast.error(data.msg || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Network error while logging in. Please try again.');
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          p: { xs: 4, sm: 4.5 },
          borderRadius: '36px',
          width: '100%',
          boxShadow: '0 10px 28px rgba(0,0,0,0.05)',
          background: '#ffffff',
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: 1.2, color: 'text.secondary' }}
        >
          TaskPlanet Social
        </Typography>

        <Typography variant="h5" fontWeight="bold" mt={0.5}>
          Welcome Back
        </Typography>
        <Typography color="text.secondary" mt={0.5} mb={3}>
          Sign in to continue to your social feed.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="filled"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: '20px',
                backgroundColor: '#f2f4f8',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="filled"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: '20px',
                backgroundColor: '#f2f4f8',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
              boxShadow: '0 6px 14px rgba(13,139,255,0.18)',
            }}
          >
            Login
          </Button>
        </Box>

        <Typography mt={3} textAlign="center" color="text.secondary">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#0d8bff',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
