import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Explore as ExploreIcon, Quiz as QuizIcon, ViewInAr as ViewInArIcon } from '@mui/icons-material';

function LandingPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box color="white">
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Geometry 3D Explorer
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Discover and learn 3D geometry through interactive visualization
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    bgcolor: theme.palette.secondary.main,
                    '&:hover': { bgcolor: theme.palette.secondary.dark }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Feature Cards */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LandingPage;