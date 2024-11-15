import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SurfaceAreaPage() {
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

      <Typography variant="h4" sx={{ mb: 4 }}>Surface Area</Typography>

      <Box display="flex" flexDirection="column" gap={4}>
        {/* Introduction */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>What is Surface Area?</Typography>
          <Typography>
            Surface Area is the total area of all faces of a 3D shape.
            It tells us how much space covers the outside of the shape.
            Measured in square units 
          </Typography>
        </MotionPaper>

        {/* Formulas */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>Basic Formulas</Typography>
          <Typography component="div">
            <Box sx={{ mb: 1 }}>• Cube: SA = 6a² (a = edge length)</Box>
            <Box sx={{ mb: 1 }}>• Sphere: SA = 4πr² (r = radius)</Box>
            <Box sx={{ mb: 1 }}>• Cylinder: SA = 2πr² + 2πrh (r = radius, h = height)</Box>
            <Box>• Cone: SA = πr² + πrs (r = radius, s = slant height)</Box>
          </Typography>
        </MotionPaper>
      </Box>
    </Container>
  );
}

export default SurfaceAreaPage;