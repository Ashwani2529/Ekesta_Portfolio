import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Send,
  Email,
  Person,
  Subject,
  Message,
  CheckCircle,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const serverUrl = 'http://localhost:5000';
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const response = await axios.post(`${serverUrl}/api/contact`, data);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message || "Message sent successfully! I'll get back to you soon.",
        });
        toast.success("Message sent successfully!");
        reset(); // Clear form
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Email,
      title: 'Email',
      value: 'ekesta.shell@proton.me',
      description: 'Send me a message anytime',
    },
    {
      icon: Person,
      title: 'Phone',
      value: '+91‑8543921712',
      description: 'Available for calls and WhatsApp',
    },
    {
      icon: CheckCircle,
      title: 'Availability',
      value: 'Open to opportunities',
      description: 'Looking for internships and entry-level positions',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Aman's Portfolio | Get in Touch</title>
        <meta
          name="description"
          content="Contact Aman Mishra for internship opportunities, collaborations, or technical discussions about systems programming and C++. Let's build something extraordinary together."
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
            <Box sx={{ textAlign: 'center', mb: 8 }}>
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
                📡 Contact the Batcave
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
                Ready to embark on a digital mission together? Send a signal to the Dark Knight Developer.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={6}>
            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: '#FFD700',
                    mb: 4,
                  }}
                >
                  🦇 Let's Connect
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      >
                        <Card
                          sx={{
                            background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                            border: '1px solid #333',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: '#FFD700',
                              boxShadow: '0 8px 25px rgba(255, 215, 0, 0.15)',
                              transform: 'translateY(-3px)',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Icon sx={{ color: '#FFD700', fontSize: '2rem' }} />
                              <Typography
                                variant="h6"
                                sx={{ color: '#E0E0E0', fontWeight: 600 }}
                              >
                                {info.title}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                color: '#FFD700',
                                fontWeight: 500,
                                mb: 1,
                                fontFamily: 'Roboto Mono, monospace',
                              }}
                            >
                              {info.value}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: '#BDBDBD' }}
                            >
                              {info.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Box>

                {/* Additional Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Card
                    sx={{
                      mt: 4,
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFEB3B 100%)',
                      color: '#0D0D0D',
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 2 }}
                      >
                        🌟 Why Reach Out?
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        Whether you need a developer for your next project, want to discuss technology, 
                        or just want to connect with a fellow code enthusiast, I'm always ready to help 
                        protect and serve the digital community.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                    border: '1px solid #333',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#FFD700',
                      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        color: '#FFD700',
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      📨 Send a Signal
                    </Typography>

                    {submitStatus && (
                      <Alert
                        severity={submitStatus.type}
                        sx={{
                          mb: 3,
                          backgroundColor:
                            submitStatus.type === 'success' ? '#1B2A1B' : '#2D1B1B',
                          color:
                            submitStatus.type === 'success' ? '#81C784' : '#FF6B6B',
                          '& .MuiAlert-icon': {
                            color:
                              submitStatus.type === 'success' ? '#81C784' : '#FF6B6B',
                          },
                        }}
                      >
                        {submitStatus.message}
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="name"
                            control={control}
                            rules={{
                              required: 'Name is required',
                              minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters',
                              },
                              maxLength: {
                                value: 100,
                                message: 'Name must be less than 100 characters',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Name"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                InputProps={{
                                  startAdornment: (
                                    <Person sx={{ color: '#FFD700', mr: 1 }} />
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
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#FFD700',
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="email"
                            control={control}
                            rules={{
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Email"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputProps={{
                                  startAdornment: (
                                    <Email sx={{ color: '#FFD700', mr: 1 }} />
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
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#FFD700',
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Controller
                            name="subject"
                            control={control}
                            rules={{
                              required: 'Subject is required',
                              minLength: {
                                value: 5,
                                message: 'Subject must be at least 5 characters',
                              },
                              maxLength: {
                                value: 200,
                                message: 'Subject must be less than 200 characters',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Subject"
                                error={!!errors.subject}
                                helperText={errors.subject?.message}
                                InputProps={{
                                  startAdornment: (
                                    <Subject sx={{ color: '#FFD700', mr: 1 }} />
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
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#FFD700',
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Controller
                            name="message"
                            control={control}
                            rules={{
                              required: 'Message is required',
                              minLength: {
                                value: 10,
                                message: 'Message must be at least 10 characters',
                              },
                              maxLength: {
                                value: 2000,
                                message: 'Message must be less than 2000 characters',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Message"
                                multiline
                                rows={6}
                                error={!!errors.message}
                                helperText={errors.message?.message}
                                InputProps={{
                                  startAdornment: (
                                    <Message sx={{ color: '#FFD700', mr: 1, alignSelf: 'flex-start', mt: 1 }} />
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
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#FFD700',
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              disabled={isSubmitting}
                              startIcon={
                                isSubmitting ? (
                                  <CircularProgress size={20} sx={{ color: '#0D0D0D' }} />
                                ) : (
                                  <Send />
                                )
                              }
                              sx={{
                                px: 6,
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
                                '&:disabled': {
                                  background: '#666',
                                  color: '#999',
                                  transform: 'none',
                                  boxShadow: 'none',
                                },
                              }}
                            >
                              {isSubmitting ? 'Sending Signal...' : 'Send Message'}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
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

export default Contact; 