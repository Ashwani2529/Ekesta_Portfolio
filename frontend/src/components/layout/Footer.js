import React from 'react';
import { Box, Typography, Container, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LinkedIn,
  X,
  GitHub,
  KeyboardArrowUp,
  Mail,
  Phone,
  Code,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: LinkedIn, href: 'https://linkedin.com/in/EkestaAkehrgi', label: 'LinkedIn' },
    { icon: X, href: 'https://x.com/EkestaAkehrgi', label: 'X' },
    { icon: GitHub, href: 'https://github.com/EkestaAkehrgi', label: 'GitHub' },
    { icon: Mail, href: 'mailto:ekesta.shell@proton.me', label: 'Email' },
    {icon: Phone, href: 'tel:+918543921712', label: 'Phone'},
    {icon: Code, href: 'https://leetcode.com/u/EkestaAkehrgi/', label: 'LeetCode'}
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
        borderTop: '1px solid #333',
        overflow: 'hidden',
        mt: 'auto',
      }}
    >
      {/* Ekesta Logo Watermark */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '8rem',
          opacity: 0.05,
          zIndex: 0,
          userSelect: 'none',
          pointerEvents: 'none',
          color: '#FFD700',
        }}
      >
        🦇
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 4 }}>
          {/* Back to Top Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                onClick={scrollToTop}
                sx={{
                  border: '1px solid #FFD700',
                  color: '#FFD700',
                  background: 'rgba(255, 215, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 215, 0, 0.1)',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                }}
                aria-label="Back to top"
              >
                <KeyboardArrowUp />
              </IconButton>
            </motion.div>
          </Box>

          <Divider sx={{ borderColor: '#333', mb: 3 }} />

          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  sx={{
                    fontWeight: 700,
                    color: '#FFD700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      textShadow: '0 0 10px #FFD700',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Aman's Portfolio
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: '#BDBDBD', 
                    mt: 0.5,
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                >
                  Aspiring Systems Programmer
                </Typography>
              </Box>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <IconButton
                        component="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: '#E0E0E0',
                          border: '1px solid #333',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#FFD700',
                            borderColor: '#FFD700',
                            background: 'rgba(255, 215, 0, 0.1)',
                            boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
                          },
                        }}
                        aria-label={social.label}
                      >
                        <Icon fontSize="small" />
                      </IconButton>
                    </motion.div>
                  );
                })}
              </Box>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'row', sm: 'row' },
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {[
                  { name: 'whoami', path: '/whoami' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <Typography
                    key={link.name}
                    component={Link}
                    to={link.path}
                    variant="body2"
                    sx={{
                      color: '#BDBDBD',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Roboto Mono, monospace',
                      '&:hover': {
                        color: '#FFD700',
                        textShadow: '0 0 5px #FFD700',
                      },
                    }}
                  >
                    {link.name}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Box>

          <Divider sx={{ borderColor: '#333', my: 3 }} />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#757575',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '0.8rem',
                  display: 'inline',
                }}
              >
                © {currentYear} Aman's Portfolio. All rights reserved. | Made with &lt;&gt; by{' '}
              </Typography>
              <Box
                component="a"
                href="#"
                rel="noopener noreferrer"
                sx={{
                  color: '#FFD700',
                  textDecoration: 'none',
                  fontFamily: 'Roboto Mono, monospace',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#FFEB3B',
                    textShadow: '0 0 8px rgba(255, 215, 0, 0.5)',
                  },
                }}
              >
                Ekesta
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 