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
import { signupUser } from '../services/api';
import toast from 'react-hot-toast';

export default function Signup({ onAuthSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser(form);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Signup successful');
         if (onAuthSuccess) onAuthSuccess();
        navigate('/');
      } else {
        toast.error(data.msg || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('Network error while signing up. Please try again.');
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
          Create Account
        </Typography>
        <Typography color="text.secondary" mt={0.5} mb={3}>
          Create your account and start posting.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Username"
            fullWidth
            variant="filled"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: '20px',
                backgroundColor: '#f2f4f8',
              },
            }}
          />
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
            Sign up
          </Button>
        </Box>

        <Typography mt={3} textAlign="center" color="text.secondary">
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: '#0d8bff',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
