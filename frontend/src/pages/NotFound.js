import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  Home,
  ArrowBack,
  Search,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Ekesta Portfolio</title>
        <meta
          name="description"
          content="The page you're looking for has vanished into the shadows of Gotham. Return to the light with our navigation."
        />
      </Helmet>

      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                border: '2px solid #FFD700',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ekesta Logo Background */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: { xs: '8rem', md: '12rem' },
                  opacity: 0.05,
                  zIndex: 0,
                  color: '#FFD700',
                }}
              >
                🦇
              </Box>

              <CardContent sx={{ p: { xs: 4, md: 8 }, position: 'relative', zIndex: 1 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '4rem', md: '6rem' },
                      fontWeight: 800,
                      color: '#FFD700',
                      mb: 2,
                      textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                    }}
                  >
                    404
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: '#E0E0E0',
                      mb: 3,
                    }}
                  >
                    Lost in Gotham's Shadows
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#BDBDBD',
                      mb: 4,
                      maxWidth: '500px',
                      mx: 'auto',
                      lineHeight: 1.6,
                    }}
                  >
                    The page you're looking for has vanished into the darkness of Gotham City. 
                    Even Ekesta can't find it in his database.
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 4,
                    }}
                  >
                    <Button
                      component={Link}
                      to="/"
                      variant="contained"
                      size="large"
                      startIcon={<Home />}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
                        color: '#0D0D0D',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FFEB3B, #FFD700)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
                        },
                      }}
                    >
                      Return to Batcave
                    </Button>

                    <Button
                      onClick={() => window.history.back()}
                      variant="outlined"
                      size="large"
                      startIcon={<ArrowBack />}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#FFEB3B',
                          backgroundColor: 'rgba(255, 215, 0, 0.08)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)',
                        },
                      }}
                    >
                      Go Back
                    </Button>
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#757575',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                    }}
                  >
                    "In the darkest nights, even the brightest signals can get lost. But every hero finds their way home."
                  </Typography>
                </motion.div>

                {/* Quick Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Box
                    sx={{
                      mt: 6,
                      pt: 4,
                      borderTop: '1px solid #333',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#BDBDBD', mb: 2, width: '100%' }}>
                      Or explore these areas of the Batcave:
                    </Typography>
                    
                    {[
                      { name: 'whoami', path: '/whoami' },
                      { name: 'Blog', path: '/blog' },
                      { name: 'Experience', path: '/experience' },
                      { name: 'Contact', path: '/contact' },
                    ].map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                      >
                        <Button
                          component={Link}
                          to={link.path}
                          variant="text"
                          sx={{
                            color: '#BDBDBD',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: '#FFD700',
                              backgroundColor: 'rgba(255, 215, 0, 0.05)',
                              textShadow: '0 0 5px #FFD700',
                            },
                          }}
                        >
                          {link.name}
                        </Button>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default NotFound; 