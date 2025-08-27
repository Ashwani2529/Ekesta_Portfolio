import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import pic from './pic.jpeg';
import {
  LinkedIn,
  X,
  GitHub,
  Email,
  LocationOn,
  Code,
  Coffee,
  NightsStay,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const WhoAmI = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const skills = [
    'C++', 'C++11 and beyond', 'C', 'Python', 'Java (beginner)',
    'Linux (Ubuntu)', 'Valgrind', 'OpenMP', 'MySQL', 'Git',
    'CMake', 'GitHub', 'Vim', 'Bash', 'CLion', 'Query Optimization',
    'DirectX', 'HLSL', 'Networking', 'Multithreading', 'Data Structures'
  ];

  const socialLinks = [
    {
      icon: LinkedIn,
      href: 'https://linkedin.com/in/EkestaAkehrgi',
      label: 'LinkedIn',
      color: '#0077B5'
    },
    {
      icon: X,
      href: 'https://x.com/EkestaAkehrgi',
      label: 'X',
      color: '#1DA1F2'
    },
    {
      icon: GitHub,
      href: 'https://github.com/EkestaAkehrgi',
      label: 'GitHub',
      color: '#333'
    },
    {
      icon: Email,
      href: 'mailto:ekesta.shell@proton.me',
      label: 'Email',
      color: '#FF6B6B'
    },
  ];

  const stats = [
    { label: 'Years in C++', value: '3+', icon: Code },
    { label: 'Major Projects', value: '4+', icon: Coffee },
    { label: 'Current GPA', value: '7.93', icon: NightsStay },
  ];

  return (
    <>
      <Helmet>
        <title>whoami - Aman's Portfolio | About the Systems Programmer</title>
        <meta
          name="description"
          content="Learn about Aman Mishra - aspiring systems programmer with expertise in C++, low-level programming, and building scalable high-performance software."
        />
      </Helmet>

      <Box sx={{ minHeight: '100vh', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Avatar
                src={pic}
                alt="Profile"
                sx={{
                  width: { xs: 150, md: 200 },
                  height: { xs: 150, md: 200 },
                  mx: 'auto',
                  mb: 3,
                  border: '4px solid #FFD700',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)',
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                whoami
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#E0E0E0',
                  mb: 2,
                  fontWeight: 300,
                }}
              >
                Aspiring Systems Programmer
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4 }}>
                <LocationOn sx={{ color: '#FFD700' }} />
                <Typography sx={{ color: '#BDBDBD' }}>Uttar Pradesh, India - 210205</Typography>
              </Box>
            </motion.div>
          </Box>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Grid container spacing={3} sx={{ mb: 8 }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Grid item xs={12} sm={4} key={stat.label}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card
                        sx={{
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                          border: '1px solid #333',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#FFD700',
                            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Icon sx={{ fontSize: 40, color: '#FFD700', mb: 2 }} />
                          <Typography variant="h4" sx={{ fontWeight: 700, color: '#E0E0E0', mb: 1 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>

          {/* Main Content */}
          <Grid container spacing={6}>
            {/* Bio Section */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                    border: '1px solid #333',
                    mb: 4,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: '#FFD700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      💻 About Me
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#E0E0E0',
                        lineHeight: 1.8,
                        mb: 3,
                        fontSize: '1.1rem',
                      }}
                    >
                      Aspiring System Programmer with strong expertise in C++ (C++11 and beyond), problem solving, 
                      and systems‑level development. Passionate about building scalable, high‑performance software 
                      in domains such as storage, networking, concurrency, and distributed systems.
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#E0E0E0',
                        lineHeight: 1.8,
                        mb: 3,
                        fontSize: '1.1rem',
                      }}
                    >
                      Currently in my final year of Computer Science and Information Technology at KIET Group of 
                      Institutions (AKTU) with a GPA of 7.93 and a 50% tuition scholarship for academic excellence. 
                      I love exploring the internals of computers — whether it's graphics, networking, or operating 
                      systems — basically anything that high‑level approaches shy away from and where C++ truly shines.
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#E0E0E0',
                        lineHeight: 1.8,
                        mb: 3,
                        fontSize: '1.1rem',
                      }}
                    >
                      💡 Some of my projects are still brewing locally on my machine. I'll be uploading them to GitHub soon. 
                      When not programming, I enjoy solving DSA problems on LeetCode, watching anime (Naruto is my favorite 🍥), 
                      and occasionally playing PUBG with friends.
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: '#FFD700',
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        mt: 4,
                      }}
                    >
                      "I mostly code in C++ and love explaining concepts to peers who are just starting out — teaching always sharpens my own understanding."
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Skills & Social Section */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {/* Social Links */}
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                    border: '1px solid #333',
                    mb: 4,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: '#FFD700',
                        textAlign: 'center',
                      }}
                    >
                      🔗 Connect with Me
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <motion.div
                            key={social.label}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                          >
                            <IconButton
                              component="a"
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                width: 60,
                                height: 60,
                                border: '2px solid #333',
                                color: '#E0E0E0',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  borderColor: '#FFD700',
                                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                  color: '#FFD700',
                                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                                },
                              }}
                              aria-label={social.label}
                            >
                              <Icon fontSize="large" />
                            </IconButton>
                          </motion.div>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                    border: '1px solid #333',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: '#FFD700',
                        textAlign: 'center',
                      }}
                    >
                      🛠️ Arsenal of Skills
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.1 + index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Chip
                            label={skill}
                            sx={{
                              backgroundColor: '#333',
                              color: '#E0E0E0',
                              border: '1px solid transparent',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                borderColor: '#FFD700',
                                color: '#FFD700',
                                cursor: 'pointer',
                              },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default WhoAmI; 