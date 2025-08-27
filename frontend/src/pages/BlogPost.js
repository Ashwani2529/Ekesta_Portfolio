import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  CalendarToday,
  AccessTime,
  Visibility,
  Edit,
} from '@mui/icons-material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import axios from 'axios';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const serverUrl = 'http://localhost:5000';
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serverUrl}/api/blog/${slug}`);
        setPost(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.response?.status === 404 ? 'Post not found' : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#FFD700' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 4, backgroundColor: '#2D1B1B', color: '#FF6B6B' }}>
          {error}
        </Alert>
        <Button
          component={RouterLink}
          to="/blog"
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{
            borderColor: '#FFD700',
            color: '#FFD700',
            '&:hover': {
              borderColor: '#FFEB3B',
              backgroundColor: 'rgba(255, 215, 0, 0.08)',
            },
          }}
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Ekesta Portfolio</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ mb: 4, color: '#BDBDBD' }}
              separator="›"
            >
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  color: '#BDBDBD',
                  textDecoration: 'none',
                  '&:hover': { color: '#FFD700' },
                }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/blog"
                sx={{
                  color: '#BDBDBD',
                  textDecoration: 'none',
                  '&:hover': { color: '#FFD700' },
                }}
              >
                Blog
              </Link>
              <Typography color="#FFD700">{post.title}</Typography>
            </Breadcrumbs>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: '#E0E0E0',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#BDBDBD' }}>
                  <CalendarToday sx={{ fontSize: '1rem' }} />
                  <Typography variant="body2">
                    {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#BDBDBD' }}>
                  <AccessTime sx={{ fontSize: '1rem' }} />
                  <Typography variant="body2">{post.readTime} min read</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#BDBDBD' }}>
                  <Visibility sx={{ fontSize: '1rem' }} />
                  <Typography variant="body2">{post.views} views</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: '#333',
                        color: '#E0E0E0',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 215, 0, 0.1)',
                          color: '#FFD700',
                        },
                      }}
                    />
                  ))}
                </Box>
                <Button
                  component={RouterLink}
                  to={`/blog/edit/${post.slug}`}
                  variant="outlined"
                  size="small"
                  startIcon={<Edit />}
                  sx={{
                    borderColor: '#FFD700',
                    color: '#FFD700',
                    '&:hover': {
                      borderColor: '#FFEB3B',
                      backgroundColor: 'rgba(255, 215, 0, 0.08)',
                    },
                  }}
                >
                  Edit
                </Button>
              </Box>

              <Divider sx={{ borderColor: '#333' }} />
            </Box>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              sx={{
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: '#E0E0E0',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  mb: 2,
                  mt: 4,
                  '&:first-of-type': { mt: 0 },
                },
                '& h1': { fontSize: '2.5rem', color: '#FFD700' },
                '& h2': { fontSize: '2rem', borderBottom: '2px solid #333', pb: 1 },
                '& h3': { fontSize: '1.5rem' },
                '& p': {
                  color: '#E0E0E0',
                  lineHeight: 1.8,
                  mb: 2,
                  fontSize: '1.1rem',
                },
                '& blockquote': {
                  borderLeft: '4px solid #FFD700',
                  pl: 3,
                  py: 1,
                  backgroundColor: 'rgba(255, 215, 0, 0.05)',
                  borderRadius: '0 8px 8px 0',
                  fontStyle: 'italic',
                  color: '#BDBDBD',
                  mb: 3,
                },
                '& ul, & ol': {
                  color: '#E0E0E0',
                  pl: 3,
                  mb: 2,
                  '& li': {
                    mb: 1,
                    lineHeight: 1.6,
                  },
                },
                '& a': {
                  color: '#FFD700',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderBottomColor: '#FFD700',
                    textShadow: '0 0 5px #FFD700',
                  },
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  border: '1px solid #333',
                  mb: 2,
                },
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  mb: 3,
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #333',
                  borderRadius: 1,
                  overflow: 'hidden',
                },
                '& th, & td': {
                  border: '1px solid #333',
                  padding: '12px',
                  textAlign: 'left',
                },
                '& th': {
                  backgroundColor: '#2A2A2A',
                  color: '#FFD700',
                  fontWeight: 600,
                },
                '& td': {
                  color: '#E0E0E0',
                },
                '& hr': {
                  border: 'none',
                  borderTop: '2px solid #333',
                  my: 4,
                },
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            backgroundColor: '#1A1A1A',
                            border: '1px solid #333',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </Box>
                    ) : (
                      <Box
                        component="code"
                        sx={{
                          backgroundColor: '#333',
                          color: '#FFD700',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontFamily: 'Roboto Mono, monospace',
                          fontSize: '0.9em',
                        }}
                        {...props}
                      >
                        {children}
                      </Box>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </Box>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Divider sx={{ borderColor: '#333', my: 6 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                component={RouterLink}
                to="/blog"
                variant="outlined"
                startIcon={<ArrowBack />}
                sx={{
                  borderColor: '#FFD700',
                  color: '#FFD700',
                  '&:hover': {
                    borderColor: '#FFEB3B',
                    backgroundColor: 'rgba(255, 215, 0, 0.08)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Back to Blog
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost; 