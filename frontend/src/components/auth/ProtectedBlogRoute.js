import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useBlogAuth } from '../../contexts/BlogAuthContext';
import BlogPasswordModal from './BlogPasswordModal';

const ProtectedBlogRoute = ({ children }) => {
  const { isAuthenticated, loading } = useBlogAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        setShowPasswordModal(true);
      } else {
        setShowPasswordModal(false);
      }
    }
  }, [isAuthenticated, loading]);

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    // Redirect back to blog list
    navigate('/blog');
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2
        }}
      >
        <CircularProgress sx={{ color: '#FFD700' }} size={40} />
        <Typography sx={{ color: '#E0E0E0', opacity: 0.8 }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Show password modal if not authenticated */}
      <BlogPasswordModal
        open={showPasswordModal}
        onClose={handlePasswordCancel}
        onSuccess={handlePasswordSuccess}
      />
      
      {/* Only render children if authenticated and modal is closed */}
      {isAuthenticated && !showPasswordModal ? children : null}
    </>
  );
};

export default ProtectedBlogRoute; 