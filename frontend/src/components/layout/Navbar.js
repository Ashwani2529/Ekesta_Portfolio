import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Article as ArticleIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'whoami', path: '/whoami', icon: PersonIcon },
  { name: 'Blog', path: '/blog', icon: ArticleIcon },
  { name: 'Experience', path: '/experience', icon: WorkIcon },
  { name: 'Contact', path: '/contact', icon: ContactIcon },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  // Desktop Navigation
  const DesktopNav = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path || 
          (item.path === '/blog' && location.pathname.startsWith('/blog'));
        
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              component={Link}
              to={item.path}
              color="inherit"
              sx={{
                position: 'relative',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#FFD700' : '#E0E0E0',
                textTransform: 'none',
                fontSize: '1rem',
                px: 2,
                py: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FFD700',
                  transform: 'translateY(-2px)',
                  textShadow: '0 0 10px #FFD700',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: isActive ? '80%' : '0%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #FFD700, #FFEB3B)',
                  transform: 'translateX(-50%)',
                  transition: 'width 0.3s ease',
                },
                '&:hover::after': {
                  width: '80%',
                },
              }}
            >
              {item.name}
            </Button>
          </motion.div>
        );
      })}
    </Box>
  );

  // Mobile Navigation Drawer
  const MobileDrawer = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 280,
          background: 'linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)',
          borderLeft: '1px solid #FFD700',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>
            🦇 Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFD700' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/blog' && location.pathname.startsWith('/blog'));
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={closeDrawer}
                    sx={{
                      borderRadius: 2,
                      border: isActive ? '1px solid #FFD700' : '1px solid transparent',
                      background: isActive ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                      color: isActive ? '#FFD700' : '#E0E0E0',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 215, 0, 0.1)',
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    <Icon sx={{ mr: 2, color: isActive ? '#FFD700' : '#E0E0E0' }} />
                    <ListItemText 
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '1.1rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled 
            ? 'rgba(13, 13, 13, 0.95)' 
            : 'rgba(13, 13, 13, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid #333' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                color: '#FFD700',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'all 0.3s ease',
                '&:hover': {
                  textShadow: '0 0 20px #FFD700',
                  transform: 'scale(1.05)',
                },
              }}
            >
              🦇 Ekesta Portfolio
            </Typography>
          </motion.div>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: '#FFD700',
                border: '1px solid #FFD700',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 215, 0, 0.1)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </>
  );
};

export default Navbar; 