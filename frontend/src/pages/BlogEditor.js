import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  Breadcrumbs,
  Link,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Save,
  ArrowBack,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import MDEditor from '@uiw/react-md-editor';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useBlogAuth } from '../contexts/BlogAuthContext';
const steps = ['Write Content', 'Post Details'];

const BlogEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { logout } = useBlogAuth();
  const serverUrl = 'http://localhost:5000';
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [newTag, setNewTag] = useState('');
  const isEditMode = Boolean(slug);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      tags: [],
      published: false,
      featured: false,
    },
  });

  const watchedValues = watch();
  const { title, content, tags } = watchedValues;



  // Fetch post data if editing
  useEffect(() => {
    if (isEditMode && slug) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${serverUrl}/api/blog/${slug}`);
          const post = response.data.data;
          
          setValue('title', post.title);
          setValue('content', post.content);
          setValue('excerpt', post.excerpt);
          setValue('tags', post.tags || []);
          setValue('published', post.published);
          setValue('featured', post.featured);
        } catch (error) {
          console.error('Error fetching post:', error);
          toast.error('Failed to load post for editing');
          navigate('/blog');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [slug, isEditMode, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      if (!data.content || !data.content.trim()) {
        toast.error('Please write some content first.');
        setActiveStep(0);
        return;
      }

      if (isEditMode) {
        await axios.put(`${serverUrl}/api/blog/${slug}`, data);
        toast.success('Post updated successfully!');
        navigate(`/blog/${data.slug || slug}`);
      } else {
        const response = await axios.post(`${serverUrl}/api/blog`, data);
        toast.success('Post created successfully!');
        navigate(`/blog/${response.data.data.slug}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      const message = error.response?.data?.message || 'Failed to save post';
      toast.error(message);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setValue('tags', [...tags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove));
  };

  const goNext = async () => {
    if (activeStep === 0) {
      // Validate content before moving to details
      if (!content || !content.trim()) {
        toast.error('Content cannot be empty');
        return;
      }
    }
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
      }

  // Allow a safe subset of HTML (images/iframes) in preview
  const sanitizeSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), 'iframe', 'video', 'source'],
    attributes: {
      ...defaultSchema.attributes,
      iframe: [
        'src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title',
        'loading', 'referrerpolicy', 'sandbox', 'name', 'srcdoc'
      ],
      video: ['src', 'width', 'height', 'controls', 'poster', 'preload', 'autoplay', 'loop', 'muted'],
      source: ['src', 'type', 'media'],
      img: [...(defaultSchema.attributes?.img || []), 'loading', 'decoding'],
    },
  };

    return (
    <>
      <Helmet>
        <title>
          {isEditMode ? `Edit Post` : 'Create New Post'} - Ekesta Portfolio
        </title>
      </Helmet>

      <Box sx={{ minHeight: '100vh', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl">
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
              <Typography color="#FFD700">
                {isEditMode ? 'Edit Post' : 'New Post'}
              </Typography>
            </Breadcrumbs>
          </motion.div>

          {/* Header + Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFD700' }}>
              {activeStep === 0 ? '✍️ Write Content' : '📄 Post Details'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                onClick={() => {
                  logout();
                  navigate('/blog');
                }}
                variant="outlined"
                sx={{
                  borderColor: '#666',
                  color: '#E0E0E0',
                  fontSize: '0.85rem',
                  '&:hover': {
                    borderColor: '#999',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                🔓 Logout
              </Button>
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
              {activeStep === 0 ? (
                <Button onClick={goNext} variant="contained" sx={{ background: 'linear-gradient(45deg, #FFD700, #FFEB3B)', color: '#0D0D0D', fontWeight: 700 }}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit(onSubmit)} variant="contained" startIcon={<Save />} disabled={isSubmitting} sx={{ background: 'linear-gradient(45deg, #FFD700, #FFEB3B)', color: '#0D0D0D', fontWeight: 700 }}>
                  {isSubmitting ? 'Saving...' : 'Publish'}
                </Button>
              )}
            </Box>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step 1: Markdown Editor with Preview */}
          {activeStep === 0 && (
            <Grid container spacing={4}>
              <Grid item xs={12} lg={7}>
                <Card sx={{ background: '#1A1A1A', border: '1px solid #333' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box 
                      data-color-mode="dark" 
                      sx={{ 
                        p: 2,
                        '& .w-md-editor': {
                          backgroundColor: '#010101',
                          color: '#ffffff',
                        },
                        '& .w-md-editor-text': {
                          backgroundColor: '#010101',
                        },
                        '& .w-md-editor-text-textarea textarea': {
                          color: '#ffffff !important',
                          backgroundColor: '#010101 !important',
                          fontSize: '14px',
                          fontFamily: 'Roboto Mono, monospace',
                          caretColor: '#FFD700',
                          border: 'none',
                          outline: 'none',
                        },
                        '& .w-md-editor-preview': {
                          backgroundColor: '#1A1A1A',
                          color: '#ffffff',
                        },
                        '& .w-md-editor-toolbar': {
                          backgroundColor: '#2A2A2A',
                          borderBottom: '1px solid #333',
                        },
                        '& .w-md-editor-toolbar li button': {
                          color: '#ffffff',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                            color: '#FFD700',
                          },
                        },
                      }}
                    >
                      <Controller
                        name="content"
                        control={control}
                        rules={{ required: 'Content is required' }}
                        render={({ field }) => (
                          <MDEditor
                            value={field.value}
                            onChange={(val) => field.onChange(val || '')}
                            height={520}
                            previewOptions={{
                              rehypePlugins: [[rehypeRaw], [rehypeSanitize, sanitizeSchema]],
                            }}
                            preview="edit"
                            hideToolbar={false}
                            visibleDragBar={false}
                            data-color-mode="dark"
                            textareaProps={{
                              spellCheck: false,
                              style: {
                                color: '#ffffff',
                                backgroundColor: '#010101',
                                fontFamily: 'Roboto Mono, monospace',
                                fontSize: '14px',
                                caretColor: '#FFD700',
                              }
                            }}
                          />
                        )}
                      />
                      {errors.content && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {errors.content.message}
                        </Alert>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Live Preview */}
              <Grid item xs={12} lg={5}>
                <Card sx={{ background: '#1A1A1A', border: '1px solid #333', height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, fontWeight: 600 }}>
                      Live Preview
                    </Typography>
                    <Box data-color-mode="dark" sx={{ px: 1 }}>
                      <MDEditor.Markdown
                        source={content || 'Start writing to see preview...'}
                        rehypePlugins={[[rehypeRaw], [rehypeSanitize, sanitizeSchema]]}
                        style={{ background: 'transparent' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Step 2: Details */}
          {activeStep === 1 && (
            <Grid container spacing={4}>
              <Grid item xs={12} lg={7}>
                <Card sx={{ background: '#1A1A1A', border: '1px solid #333', mb: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 600 }}>
                      📝 Post Details
                    </Typography>

                    {/* Title */}
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: 'Title is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Title"
                          error={!!errors.title}
                          helperText={errors.title?.message}
                          sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderRadius: 2,
                              },
                            },
                          }}
                        />
                      )}
                    />

                    {/* Excerpt */}
                    <Controller
                      name="excerpt"
                      control={control}
                      rules={{ required: 'Excerpt is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Excerpt"
                          multiline
                          rows={3}
                          error={!!errors.excerpt}
                          helperText={errors.excerpt?.message}
                          sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderRadius: 2,
                              },
                            },
                          }}
                        />
                      )}
                    />

                    {/* Tags */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ color: '#E0E0E0', mb: 2 }}>
                        Tags
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => removeTag(tag)}
                            deleteIcon={<RemoveIcon />}
                            sx={{
                              backgroundColor: '#333',
                              color: '#E0E0E0',
                              '& .MuiChip-deleteIcon': {
                                color: '#FF6B6B',
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          size="small"
                          label="Add tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                          sx={{ flexGrow: 1 }}
                        />
                        <Button
                          onClick={addTag}
                          variant="outlined"
                          sx={{
                            borderColor: '#FFD700',
                            color: '#FFD700',
                            minWidth: 'auto',
                            px: 2,
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </Box>

                    {/* Switches */}
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Controller
                        name="published"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Switch
                                {...field}
                                checked={field.value}
                              />
                            }
                            label={
                              <Typography sx={{ color: '#E0E0E0' }}>
                                Published
                              </Typography>
                            }
                          />
                        )}
                      />
                      
                      <Controller
                        name="featured"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Switch
                                {...field}
                                checked={field.value}
                              />
                            }
                            label={
                              <Typography sx={{ color: '#E0E0E0' }}>
                                Featured
                              </Typography>
                            }
                          />
                        )}
                      />
                    </Box>
                  </CardContent>
                </Card>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button onClick={goBack} variant="outlined" sx={{ borderColor: '#FFD700', color: '#FFD700' }}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit(onSubmit)} variant="contained" startIcon={<Save />} disabled={isSubmitting} sx={{ background: 'linear-gradient(45deg, #FFD700, #FFEB3B)', color: '#0D0D0D', fontWeight: 700 }}>
                    {isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                  </Button>
                </Box>
              </Grid>

              {/* Preview on the right */}
              <Grid item xs={12} lg={5}>
                <Card sx={{ background: '#1A1A1A', border: '1px solid #333', height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, fontWeight: 600 }}>
                      Content Preview
                    </Typography>
                    <Box data-color-mode="dark" sx={{ px: 1 }}>
                      <MDEditor.Markdown
                        source={content || 'Write content in step 1 to see preview...'}
                        rehypePlugins={[[rehypeRaw], [rehypeSanitize, sanitizeSchema]]}
                        style={{ background: 'transparent' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default BlogEditor; 