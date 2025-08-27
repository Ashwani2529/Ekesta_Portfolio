import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import {Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent} from '@mui/lab';
import {
  Work,
  School,
  Star,
  Code,
  Business,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const experiences = [
    {
      id: 1,
      type: 'work',
      title: 'Student Mentor – DBMS & Operating Systems',
      company: 'Department of Computer Science, KIET Group of Institutions',
      location: 'AKTU',
      period: 'Oct 2024 – Feb 2025',
      description: 'Invited by the department to conduct academic support sessions for 80+ students on Database Management Systems and Operating Systems. Multiple sessions across weeks during odd and even semesters.',
      technologies: ['SQL', 'ER Modeling', 'Normalization', 'Process Scheduling', 'Threading', 'Memory Management'],
      achievements: [
        'Conducted sessions for 80+ students across multiple weeks',
        'Received positive feedback from students and faculty for clear explanations',
        'Contributed practice problems and revision materials for semester exam preparation',
        'Delivered engaging, concept‑driven sessions with effective delivery methods',
      ],
      icon: School,
      color: '#FFD700',
    },
    {
      id: 2,
      type: 'education',
      title: 'B.Tech in Computer Science and Information Technology',
      company: 'KIET Group of Institutions (AKTU)',
      location: 'Uttar Pradesh, India',
      period: 'Nov 2022 – Present',
      description: 'Currently pursuing Bachelor of Technology with a focus on systems programming, algorithms, and low-level development. Maintaining strong academic performance.',
      technologies: ['C++', 'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks'],
      achievements: [
        'Current GPA: 7.93/10',
        '50% tuition scholarship for academic excellence',
        'Active in department mentoring programs',
        'Focus on systems programming and performance optimization',
      ],
      icon: School,
      color: '#64B5F6',
    },
    {
      id: 3,
      type: 'education',
      title: 'Higher Secondary Education',
      company: 'St Thomas School (CBSE)',
      location: 'India',
      period: '2020 - 2021',
      description: 'Completed Class X (2020) and Class XII (2021) with strong academic performance, building a solid foundation for computer science studies.',
      technologies: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'],
      achievements: [
        'Class X: 89.8% (2020)',
        'Class XII: 80.8% (2021)',
        'Strong foundation in mathematics and sciences',
        'Early interest in computer programming and problem solving',
      ],
      icon: Star,
      color: '#81C784',
    },
  ];

  const skills = {
    'Programming': ['C++', 'C++11 and beyond', 'C', 'Python', 'Java (beginner)'],
    'Systems': ['Linux (Ubuntu)', 'Valgrind', 'OpenMP', 'Multithreading', 'Concurrency'],
    'Database': ['MySQL', 'RDBMS', 'Query Optimization', 'ER Modeling', 'Normalization'],
    'Graphics': ['DirectX', 'HLSL', '3D Graphics Programming', 'Rendering Pipelines'],
    'Tools': ['Git', 'CMake', 'GitHub', 'Vim', 'Bash', 'CLion'],
  };

  const ExperienceCard = ({ experience, index }) => {
    const Icon = experience.icon;
    
    return (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ 
            m: 'auto 0',
            display: { xs: 'none', md: 'block' },
            color: '#BDBDBD',
            fontFamily: 'Roboto Mono, monospace',
            fontWeight: 500,
          }}
          align="right"
          variant="body2"
        >
          {experience.period}
        </TimelineOppositeContent>
        
        <TimelineSeparator>
          <TimelineDot
            sx={{
              backgroundColor: experience.color,
              border: `3px solid ${experience.color}20`,
              boxShadow: `0 0 20px ${experience.color}40`,
              p: 1,
            }}
          >
            <Icon sx={{ color: '#0D0D0D', fontSize: '1.5rem' }} />
          </TimelineDot>
          {index < experiences.length - 1 && (
            <TimelineConnector sx={{ backgroundColor: '#333', height: 60 }} />
          )}
        </TimelineSeparator>
        
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                border: `1px solid ${experience.color}30`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: experience.color,
                  boxShadow: `0 10px 30px ${experience.color}20`,
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: '#E0E0E0',
                      mb: 1,
                    }}
                  >
                    {experience.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: experience.color,
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {experience.company} • {experience.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#BDBDBD',
                      fontFamily: 'Roboto Mono, monospace',
                      display: { xs: 'block', md: 'none' },
                      mb: 2,
                    }}
                  >
                    {experience.period}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#BDBDBD',
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {experience.description}
                </Typography>

                {experience.achievements && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: '#FFD700', mb: 1, fontWeight: 600 }}
                    >
                      Key Achievements:
                    </Typography>
                    {experience.achievements.map((achievement, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Star sx={{ color: experience.color, fontSize: '0.8rem', mr: 1 }} />
                        <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {experience.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        backgroundColor: '#333',
                        color: '#E0E0E0',
                        border: `1px solid ${experience.color}30`,
                        '&:hover': {
                          backgroundColor: `${experience.color}20`,
                          borderColor: experience.color,
                          color: experience.color,
                        },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </TimelineContent>
      </TimelineItem>
    );
  };

  return (
    <>
      <Helmet>
        <title>Experience - Aman's Portfolio | Academic & Professional Journey</title>
        <meta
          name="description"
          content="Explore Aman Mishra's academic journey and mentoring experience - education at KIET Group of Institutions, Student Mentor role, and technical expertise in systems programming."
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
                🦇 Professional Journey
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
                The evolution of a Dark Knight Developer through experience, education, and continuous learning
              </Typography>
            </Box>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Timeline position={isMobile ? 'right' : 'alternate'}>
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                />
              ))}
            </Timeline>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mt: 12, textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 6,
                  color: '#FFD700',
                }}
              >
                🛠️ Technical Arsenal
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {Object.entries(skills).map(([category, techList], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
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
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: '#FFD700',
                            mb: 3,
                            textAlign: 'left',
                          }}
                        >
                          {category}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'flex-start' }}>
                          {techList.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.05 }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Chip
                                label={tech}
                                sx={{
                                  backgroundColor: '#333',
                                  color: '#E0E0E0',
                                  border: '1px solid transparent',
                                  fontSize: '0.9rem',
                                  height: 36,
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
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mt: 12, mb: 8 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 6,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                🚀 Featured Projects
              </Typography>

              <Grid container spacing={4}>
                {/* 3D Graphics DirectX Programming */}
                <Grid item xs={12} md={6}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                        border: '1px solid #333',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#FFD700',
                          boxShadow: '0 15px 40px rgba(255, 215, 0, 0.2)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Code sx={{ fontSize: 32, color: '#FFD700', mr: 2 }} />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#E0E0E0' }}>
                            3D Graphics DirectX Programming
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#BDBDBD', mb: 3, lineHeight: 1.6 }}>
                          Created mesh and rendering mechanism for 3D graphics using DirectX. 
                          Implemented first‑person view, Gaussian filter, and screen mapping techniques.
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
                          Dec 2024 – Present
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {['C++', 'DirectX', 'HLSL'].map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                color: '#FFD700',
                                border: '1px solid rgba(255, 215, 0, 0.3)',
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                {/* QOI Decoder */}
                <Grid item xs={12} md={6}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                        border: '1px solid #333',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#64B5F6',
                          boxShadow: '0 15px 40px rgba(100, 181, 246, 0.2)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <EmojiEvents sx={{ fontSize: 32, color: '#64B5F6', mr: 2 }} />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#E0E0E0' }}>
                            QOI Decoder
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#BDBDBD', mb: 3, lineHeight: 1.6 }}>
                          Built a QOI image decoder achieving 20× compression and 5× decompression speed vs JPEG. 
                          Used multi‑threading to boost performance by 30%.
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
                          Jul 2024
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {['C++', 'OpenMP', 'STL'].map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(100, 181, 246, 0.1)',
                                color: '#64B5F6',
                                border: '1px solid rgba(100, 181, 246, 0.3)',
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                {/* Gossip Network Implementation */}
                <Grid item xs={12} md={6}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                        border: '1px solid #333',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#81C784',
                          boxShadow: '0 15px 40px rgba(129, 199, 132, 0.2)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Work sx={{ fontSize: 32, color: '#81C784', mr: 2 }} />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#E0E0E0' }}>
                            Gossip Network Implementation
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#BDBDBD', mb: 3, lineHeight: 1.6 }}>
                          Developed gossip protocol for distributed systems communication. 
                          Created fault‑tolerant message delivery with 99% reliability.
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
                          Sep 2024 – Oct 2024
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {['C++', 'Networking Libraries', 'Multithreading'].map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(129, 199, 132, 0.1)',
                                color: '#81C784',
                                border: '1px solid rgba(129, 199, 132, 0.3)',
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                {/* Redis Database From Scratch */}
                <Grid item xs={12} md={6}>
                  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                        border: '1px solid #333',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#FFB74D',
                          boxShadow: '0 15px 40px rgba(255, 183, 77, 0.2)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Business sx={{ fontSize: 32, color: '#FFB74D', mr: 2 }} />
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#E0E0E0' }}>
                            Redis Database From Scratch
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#BDBDBD', mb: 3, lineHeight: 1.6 }}>
                          Built an in‑memory key‑value database with AOF and RDB persistence. 
                          Achieved 95% Redis command compatibility and 10K+ ops/sec.
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>
                          Nov 2023 – Feb 2024
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {['C', 'Network Programming', 'Data Structures'].map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 183, 77, 0.1)',
                                color: '#FFB74D',
                                border: '1px solid rgba(255, 183, 77, 0.3)',
                              }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mt: 12, textAlign: 'center' }}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
                  border: '2px solid #FFD700',
                  p: 6,
                }}
              >
                <EmojiEvents sx={{ fontSize: 64, color: '#FFD700', mb: 3 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#E0E0E0',
                    mb: 2,
                  }}
                >
                  Ready for the Next Challenge?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#BDBDBD',
                    mb: 4,
                    maxWidth: '500px',
                    mx: 'auto',
                  }}
                >
                  Looking for internship opportunities and entry-level positions in systems programming. Let's build something extraordinary together!
                </Typography>
              </Card>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Experience; 