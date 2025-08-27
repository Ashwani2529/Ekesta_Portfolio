import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { BlogAuthProvider } from './contexts/BlogAuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import WhoAmI from './pages/WhoAmI';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Components (for blog management)
import BlogEditor from './pages/BlogEditor';
import ProtectedBlogRoute from './components/auth/ProtectedBlogRoute';

function App() {
  const location = useLocation();

  return (
    <BlogAuthProvider>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)'
        }}
      >
        <Navbar />
        
        <Box component="main" sx={{ flexGrow: 1, pt: { xs: 7, sm: 8 } }}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/whoami" element={<WhoAmI />} />
              <Route path="/blog" element={<Blog />} />
              <Route 
                path="/blog/new" 
                element={
                  <ProtectedBlogRoute>
                    <BlogEditor />
                  </ProtectedBlogRoute>
                } 
              />
              <Route 
                path="/blog/edit/:slug" 
                element={
                  <ProtectedBlogRoute>
                    <BlogEditor />
                  </ProtectedBlogRoute>
                } 
              />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Box>
        
        <Footer />
      </Box>
    </BlogAuthProvider>
  );
}

export default App; 