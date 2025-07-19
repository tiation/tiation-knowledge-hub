import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const { login } = useAuthStore();

  const handleLogin = () => {
    // Mock login for demonstration
    login(
      { name: 'Demo User', email: 'demo@example.com', role: 'admin' },
      'demo-token',
      'demo-tenant'
    );
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Typography variant="h3" gutterBottom>
          Tiation Knowledge Hub
        </Typography>
        <Typography variant="h6" gutterBottom color="text.secondary">
          Enterprise Knowledge Management System
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleLogin}
          sx={{ mt: 3 }}
        >
          Demo Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
