import { useAuth } from '../contexts/AuthContext';
import Leaderboard from '../components/quiz/Leaderboard';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  ViewInAr,
  Quiz as QuizIcon,
  Calculate,
  PlayCircleOutline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const MotionPaper = motion(Paper);
  const MotionBox = motion(Box);

  const modules = [
    {
      title: "Basic Shapes",
      description: "Introduction to 3D geometric shapes and their properties",
      topics: ["Cube", "Sphere", "Cylinder", "Cone"],
    },
    {
      title: "Surface Area",
      description: "Learn to calculate surface areas of various 3D shapes",
      topics: ["Concept Introduction", "Formula Application", "Shape Comparison"],
    },
    {
      title: "Volume",
      description: "Volume calculations for different geometric solids",
      topics: ["Concept Introduction", "Formula Application", "Shape Comparison"],
    }
  ];

  const features = [
    {
      title: '3D Shape Explorer',
      description: 'Interactive 3D geometric shapes with real-time manipulation',
      icon: <ViewInAr sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      action: () => navigate('/explore'),
      progress: 100,
    },
    {
      title: 'Interactive Quiz',
      description: 'Test your knowledge with adaptive learning quizzes',
      icon: <QuizIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      action: () => navigate('/quiz'),
      progress: 100,
    },
    {
      title: 'Shape Calculator',
      description: 'Complex geometric calculations made simpleQuick calculator for volume and surface area of 3D shapes',
      icon: <Calculate sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      action: () => navigate('/calculator'),
      progress: 100,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Main Content Section */}
        <Grid item xs={12} md={8}>
          {/* Hero Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              textAlign: 'center',
              mb: 6,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200%',
                height: '300px',
                background: `radial-gradient(circle, ${theme.palette.primary.light}15, transparent 60%)`,
                zIndex: -1,
              }
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                mx: 'auto',
                bgcolor: theme.palette.primary.main,
                fontSize: '2rem',
              }}
            >
              {currentUser?.email[0].toUpperCase()}
            </Avatar>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              Welcome, {currentUser?.email.split('@')[0]}!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Continue your journey in 3D geometry exploration
            </Typography>
          </MotionBox>

          {/* Modules Section */}
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
            Learning Modules
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {modules.map((module, index) => (
              <Grid item xs={12} key={module.title}>
                <MotionPaper
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  sx={{
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {module.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {module.description}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {module.topics.map((topic) => (
                      <Box
                        key={topic}
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'rgba(0, 0, 0, 0.04)',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {topic}
                      </Box>
                    ))}
                  </Box>

                  <LinearProgress 
                    variant="determinate" 
                    value={module.progress} 
                    sx={{ mb: 2, height: 6, borderRadius: 3 }} 
                  />

                  <Button
                    variant="contained"
                    startIcon={<PlayCircleOutline />}
                    fullWidth
                    onClick={() => navigate(`/${module.title.toLowerCase().replace(' ', '-')}`)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      py: 1,
                    }}
                  >
                    Learning
                  </Button>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>

          {/* Main Features */}
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Shape Your Knowledge
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <MotionPaper
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: theme.shadows[8],
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={feature.progress} 
                      sx={{ mb: 2, height: 6, borderRadius: 3 }} 
                    />
                    <Button
                      variant="contained"
                      startIcon={<PlayCircleOutline />}
                      onClick={feature.action}
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        py: 1,
                      }}
                    >
                     Try
                    </Button>
                  </Box>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Leaderboard Section */}
        <Grid item xs={12} md={4}>
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Leaderboard />
          </MotionBox>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;