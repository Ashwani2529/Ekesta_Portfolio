import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, VpnKey } from '@mui/icons-material';
import { useBlogAuth } from '../../contexts/BlogAuthContext';

const BlogPasswordModal = ({ open, onClose, onSuccess }) => {
  const { login, loading } = useBlogAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    try {
      const result = await login(password);
      
      if (result.success) {
        setPassword('');
        setError('');
        onSuccess();
      } else {
        setError(result.message || 'Invalid password');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1A1A1A',
          border: '1px solid #333',
          borderRadius: '12px',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <VpnKey sx={{ color: '#FFD700', fontSize: 32, mr: 1 }} />
        </Box>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#FFD700', 
            fontWeight: 'bold',
            mb: 1 
          }}
        >
          🦇 Admin Access Required
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: '#E0E0E0', opacity: 0.8 }}
        >
          Enter password to access blog editor
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, py: 2 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                bgcolor: 'rgba(211, 47, 47, 0.1)',
                color: '#f44336',
                border: '1px solid rgba(211, 47, 47, 0.3)'
              }}
            >
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            autoFocus
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#2A2A2A',
                '& fieldset': {
                  borderColor: '#555',
                },
                '&:hover fieldset': {
                  borderColor: '#FFD700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FFD700',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#E0E0E0',
                '&.Mui-focused': {
                  color: '#FFD700',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#E0E0E0',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#E0E0E0' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography 
            variant="caption" 
            sx={{ 
              color: '#888', 
              mt: 1, 
              display: 'block',
              fontStyle: 'italic'
            }}
          >
            💡 Hint: Check your .env file for BLOG_ADMIN_PASSWORD
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            sx={{
              color: '#E0E0E0',
              borderColor: '#555',
              '&:hover': {
                borderColor: '#777',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !password.trim()}
            variant="contained"
            sx={{
              bgcolor: '#FFD700',
              color: '#000',
              fontWeight: 'bold',
              minWidth: '100px',
              '&:hover': {
                bgcolor: '#FFC107',
              },
              '&:disabled': {
                bgcolor: '#555',
                color: '#888',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: '#000' }} />
            ) : (
              'Access Blog'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BlogPasswordModal; 