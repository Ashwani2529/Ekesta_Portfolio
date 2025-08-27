import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Alert,
  Pagination,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday,
  AccessTime,
  Visibility,
  Add as AddIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import axios from 'axios';

const Blog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 const serverUrl = 'http://localhost:5000';
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  // Fetch blog posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [postsResponse, featuredResponse, tagsResponse] = await Promise.all([
          axios.get(`${serverUrl}/api/blog?page=${currentPage}&limit=${postsPerPage}&search=${searchTerm}&tag=${selectedTag}`),
          axios.get(`${serverUrl}/api/blog/featured`),
          axios.get(`${serverUrl}/api/blog/tags`),
        ]);

        setPosts(postsResponse.data.data || []);
        setTotalPages(postsResponse.data.pagination?.pages || 1);
        setFeaturedPosts(featuredResponse.data.data || []);
        setTags(tagsResponse.data.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, selectedTag]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleTagFilter = (tagName) => {
    setSelectedTag(selectedTag === tagName ? '' : tagName);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const BlogCard = ({ post, featured = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        component={Link}
        to={`/blog/${post.slug}`}
        sx={{
          height: '100%',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
          border: featured ? '2px solid #FFD700' : '1px solid #333',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          position: 'relative',
          '&:hover': {
            borderColor: '#FFD700',
            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)',
            transform: 'translateY(-5px)',
          },
        }}
      >
        {featured && (
          <Box
            sx={{
              position: 'absolute',
              top: -1,
              right: -1,
              background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
              color: '#0D0D0D',
              px: 2,
              py: 0.5,
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '0 8px 0 8px',
            }}
          >
            FEATURED
          </Box>
        )}
        
        <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#E0E0E0',
                mb: 2,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.title}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: '#BDBDBD',
                mb: 3,
                lineHeight: 1.6,
                flexGrow: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.excerpt}
            </Typography>

            {/* Tags */}
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {post.tags?.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: '#333',
                    color: '#E0E0E0',
                    fontSize: '0.7rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      color: '#FFD700',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Meta Info */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#757575', fontSize: '0.8rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: '0.9rem' }} />
                  {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: '0.9rem' }} />
                  {post.readTime} min read
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#757575', fontSize: '0.8rem' }}>
                <Visibility sx={{ fontSize: '0.9rem' }} />
                {post.views}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#FFD700' }} />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - Aman's Portfolio | Technical Insights & Programming</title>
        <meta
          name="description"
          content="Technical deep-dives, project write-ups, and systems programming insights from Aman Mishra. Focus on C++, low-level programming, and performance optimization."
        />
      </Helmet>

      <Box sx={{ minHeight: '100vh', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                💻 Technical Chronicles
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#BDBDBD',
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                Built to support Markdown with tables, images, videos, and syntax‑highlighted code. Focus on technical deep‑dives, project write‑ups, and systems programming insights.
              </Typography>

              {/* Create New Post Button */}
              <Button
                component={Link}
                to="/blog/new"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  mb: 4,
                  background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
                  color: '#0D0D0D',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFEB3B, #FFD700)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                  },
                }}
              >
                Create New Post
              </Button>
            </Box>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card sx={{ mb: 6, background: '#1A1A1A', border: '1px solid #333' }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#FFD700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '& fieldset': {
                            borderRadius: 2,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#FFD700',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label="All"
                        onClick={() => handleTagFilter('')}
                        sx={{
                          backgroundColor: selectedTag === '' ? '#FFD700' : '#333',
                          color: selectedTag === '' ? '#0D0D0D' : '#E0E0E0',
                          '&:hover': { backgroundColor: '#FFD700', color: '#0D0D0D' },
                        }}
                      />
                      {tags.map((tag) => (
                        <Chip
                          key={tag.name}
                          label={`${tag.name} (${tag.count})`}
                          onClick={() => handleTagFilter(tag.name)}
                          sx={{
                            backgroundColor: selectedTag === tag.name ? '#FFD700' : '#333',
                            color: selectedTag === tag.name ? '#0D0D0D' : '#E0E0E0',
                            '&:hover': { backgroundColor: '#FFD700', color: '#0D0D0D' },
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {error && (
            <Alert severity="error" sx={{ mb: 4, backgroundColor: '#2D1B1B', color: '#FF6B6B' }}>
              {error}
            </Alert>
          )}

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: '#FFD700' }}>
                ⭐ Featured Posts
              </Typography>
              <Grid container spacing={3} sx={{ mb: 6 }}>
                {featuredPosts.map((post) => (
                  <Grid item xs={12} md={6} lg={4} key={post._id}>
                    <BlogCard post={post} featured />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          {/* All Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: '#E0E0E0' }}>
              📖 All Posts
            </Typography>
            
            {posts.length === 0 ? (
              <Card sx={{ background: '#1A1A1A', border: '1px solid #333', textAlign: 'center', py: 8 }}>
                <ArticleIcon sx={{ fontSize: 64, color: '#555', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#BDBDBD', mb: 1 }}>
                  No posts found
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                  {searchTerm || selectedTag
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Be the first to create a blog post!'}
                </Typography>
              </Card>
            ) : (
              <>
                <Grid container spacing={3}>
                  {posts.map((post) => (
                    <Grid item xs={12} md={6} lg={4} key={post._id}>
                      <BlogCard post={post} />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size={isMobile ? 'small' : 'medium'}
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: '#E0E0E0',
                          borderColor: '#333',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                            borderColor: '#FFD700',
                          },
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#FFD700',
                          color: '#0D0D0D',
                          '&:hover': {
                            backgroundColor: '#FFEB3B',
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Blog; 