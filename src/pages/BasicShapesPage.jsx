import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BasicShapesPage() {
  const navigate = useNavigate();
  const MotionPaper = motion(Paper);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Back to Home
      </Button>

      <Typography variant="h4" sx={{ mb: 4 }}>Basic Shapes</Typography>

      <Box display="flex" flexDirection="column" gap={4}>
        {/* Cube Section */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Cube</Typography>
          <Typography>
            A cube is a 3D shape with:
            • 6 equal square faces
            • 12 edges of equal length
            • 8 vertices
            • All angles are 90 degrees
          </Typography>
        </MotionPaper>

        {/* Sphere Section */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Sphere</Typography>
          <Typography>
            A sphere is a perfectly round shape where:
            • Every point is equidistant from the center
            • Has no edges or vertices
            • Has one continuous surface
          </Typography>
        </MotionPaper>

        {/* Cylinder Section */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Cylinder</Typography>
          <Typography>
            A cylinder consists of:
            • Two parallel circular bases
            • One curved surface connecting the bases
            • Equal radius for both bases
          </Typography>
        </MotionPaper>

        {/* Cone Section */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Cone</Typography>
          <Typography>
            A cone has:
            • One circular base
            • One vertex (point at the top)
            • One curved surface
            • Slant height from vertex to base edge
          </Typography>
        </MotionPaper>
      </Box>
    </Container>
  );
}

export default BasicShapesPage;