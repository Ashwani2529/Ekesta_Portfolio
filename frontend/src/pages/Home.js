import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  KeyboardArrowDown,
  Code,
  Article,
  Person,
  ContactMail,
  GetApp,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToFeatures = () => {
    const element = document.getElementById('features-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Person,
      title: 'whoami',
      description: 'Discover who I am, my journey, and what drives me as a developer.',
      link: '/whoami',
      color: '#FFD700',
    },
    {
      icon: Article,
      title: 'Blog',
      description: 'Technical articles, insights, and thoughts on development and technology.',
      link: '/blog',
      color: '#64B5F6',
    },
    {
      icon: Code,
      title: 'Experience',
      description: 'My professional journey, projects, and technical expertise.',
      link: '/experience',
      color: '#81C784',
    },
    {
      icon: ContactMail,
      title: 'Contact',
      description: 'Get in touch for collaborations, opportunities, or just to say hello.',
      link: '/contact',
      color: '#FFB74D',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Home - Aman's Portfolio | Systems Programmer</title>
        <meta
          name="description"
          content="Welcome to Aman's portfolio. Aspiring systems programmer sharing technical insights, projects, and thoughts on low-level development."
        />
      </Helmet>

      <Box sx={{ minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 30%, #0D0D0D 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Ekesta Silhouette Background */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: { xs: '10%', md: '15%' },
              transform: 'translateY(-50%)',
              fontSize: { xs: '15rem', sm: '20rem', md: '25rem' },
              color: 'rgba(255, 215, 0, 0.03)',
              zIndex: 0,
              userSelect: 'none',
              pointerEvents: 'none',
              animation: 'float 6s ease-in-out infinite',
            }}
          >
            🦇
          </Box>

          {/* Gotham City Silhouette (CSS Art) */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to top, #000 0%, #111 50%, transparent 100%)',
              zIndex: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60px',
                background: `
                  linear-gradient(90deg, 
                    transparent 0%, 
                    #000 10%, 
                    transparent 15%,
                    #000 20%, 
                    transparent 25%,
                    #000 30%, 
                    transparent 35%,
                    #000 40%, 
                    transparent 45%,
                    #000 50%, 
                    transparent 55%,
                    #000 60%, 
                    transparent 65%,
                    #000 70%, 
                    transparent 75%,
                    #000 80%, 
                    transparent 85%,
                    #000 90%, 
                    transparent 100%
                  )
                `,
                clipPath: 'polygon(0 100%, 5% 70%, 10% 80%, 15% 60%, 20% 75%, 25% 50%, 30% 65%, 35% 45%, 40% 70%, 45% 40%, 50% 60%, 55% 35%, 60% 55%, 65% 30%, 70% 65%, 75% 25%, 80% 70%, 85% 20%, 90% 75%, 95% 15%, 100% 80%, 100% 100%)',
              },
            }}
          />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#FFD700',
                      marginTop: 2,
                      fontFamily: 'Roboto Mono, monospace',
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Welcome to My Digital Space
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      background: 'linear-gradient(45deg, #FFD700, #FFEB3B, #FFD700)',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'gradient-flow 3s linear infinite',
                      lineHeight: 1.2,
                    }}
                  >
                    Aman's Space,{' '}
                    <Box
                      component="span"
                      sx={{
                        display: 'block',
                        color: '#E0E0E0',
                        textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                      }}
                    >
                      Right here!
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#BDBDBD',
                      mb: 4,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      maxWidth: '700px',
                    }}
                  >
                    Currently in my final year of Computer Science and Information Technology at KIET Group of Institutions 
                    and an aspiring systems programmer. I love exploring the internals of computers — whether it's graphics, 
                    networking, or operating systems — basically anything that high‑level approaches shy away from and where C++ truly shines.
                    <br /><br />
                    This site is inspired by the amazing blogs of{' '}
                    <Box
                      component="a"
                      href="https://clehaxze.tw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#FFD700',
                        textDecoration: 'none',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#FFEB3B',
                          textShadow: '0 0 8px rgba(255, 215, 0, 0.5)',
                        },
                      }}
                    >
                      Martin Chan
                    </Box>{' '}
                    and built with a little help from my friend{' '}
                    <Box
                      component="a"
                      href="https://ashwanisingh-portfolio.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#FFD700',
                        textDecoration: 'none',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#FFEB3B',
                          textShadow: '0 0 8px rgba(255, 215, 0, 0.5)',
                        },
                      }}
                    >
                      Ashwani Singh
                    </Box>. 
                    It's my little corner of the internet where I'll be sharing random thoughts, technical insights, and projects that I'm working on.
                    <br /><br />
                    Apart from programming, I enjoy solving DSA problems on{' '}
                    <Box
                      component="a"
                      href="https://leetcode.com/u/EkestaAkehrgi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#FFD700',
                        textDecoration: 'none',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#FFEB3B',
                          textShadow: '0 0 8px rgba(255, 215, 0, 0.5)',
                        },
                      }}
                    >
                      LeetCode
                    </Box>, watching anime (yes, Naruto is my all‑time favorite 🍥), 
                    and occasionally playing PUBG (I'm terrible at it, but it's still fun with friends).
                    <br /><br />
                    I mostly code in C++ (C++11 and beyond) and love explaining concepts to peers who are just starting out — teaching always sharpens my own understanding.
                    <br /><br />
                    I created this portfolio primarily for the blog section, so before you leave, do check it out — who knows, you might find something useful here 🙂
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 4 }}>
                    <Button
                      component={Link}
                      to="/whoami"
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
                        color: '#0D0D0D',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FFEB3B, #FFD700)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
                        },
                      }}
                    >
                      Discover My Identity
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={scrollToFeatures}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        '&:hover': {
                          borderColor: '#FFEB3B',
                          backgroundColor: 'rgba(255, 215, 0, 0.08)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)',
                        },
                      }}
                    >
                      Explore Arsenal
                    </Button>
                    <Button
                      component="a"
                      href="/intern_position.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      size="large"
                      startIcon={<GetApp />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: 'linear-gradient(45deg, #64B5F6, #42A5F5)',
                        color: '#fff',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #42A5F5, #1E88E5)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 10px 30px rgba(100, 181, 246, 0.4)',
                        },
                      }}
                    >
                      Download Resume
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              position: 'absolute',
              bottom: '-16px',
              left: '54%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={scrollToFeatures}
              sx={{
                color: '#FFD700',
                animation: 'bounce 2s infinite',
                '&:hover': {
                  color: '#FFEB3B',
                  background: 'rgba(255, 215, 0, 0.1)',
                },
              }}
              aria-label="Scroll to features"
            >
              <KeyboardArrowDown fontSize="large" />
            </IconButton>
          </motion.div>
        </Box>

        {/* Features Section */}
        <Box
          id="features-section"
          sx={{
            py: { xs: 8, md: 12 },
            background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  fontWeight: 700,
                  color: '#E0E0E0',
                }}
              >
                My Digital Arsenal
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mb: 8,
                  color: '#BDBDBD',
                  fontWeight: 400,
                }}
              >
                Explore the tools and knowledge that make me Gotham's premier developer
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Grid item xs={12} sm={6} md={3} key={feature.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                    >
                      <Card
                        component={Link}
                        to={feature.link}
                        sx={{
                          height: '100%',
                          textDecoration: 'none',
                          background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                          border: '1px solid #333',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: feature.color,
                            boxShadow: `0 10px 40px rgba(${feature.color === '#FFD700' ? '255, 215, 0' : 
                              feature.color === '#64B5F6' ? '100, 181, 246' :
                              feature.color === '#81C784' ? '129, 199, 132' : '255, 183, 77'}, 0.2)`,
                            transform: 'translateY(-5px)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              background: `linear-gradient(45deg, ${feature.color}20, ${feature.color}10)`,
                              border: `2px solid ${feature.color}`,
                              mb: 3,
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <Icon sx={{ fontSize: 40, color: feature.color }} />
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 600,
                              mb: 2,
                              color: '#E0E0E0',
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#BDBDBD',
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          50% { transform: translateY(-60%) rotate(5deg); }
        }
        
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </>
  );
};

export default Home; 