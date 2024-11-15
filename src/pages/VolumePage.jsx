import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function VolumePage() {
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

      <Typography variant="h4" sx={{ mb: 4 }}>Volume</Typography>

      <Box display="flex" flexDirection="column" gap={4}>
        {/* Introduction */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={2}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>What is Volume?</Typography>
          <Typography>
            Volume is the amount of space a 3D shape takes up.
            It tells us how much a shape can hold inside.
            Measured in cubic units
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
            <Box sx={{ mb: 1 }}>• Cube: V = a³ (a = edge length)</Box>
            <Box sx={{ mb: 1 }}>• Sphere: V = 4/3 πr³ (r = radius)</Box>
            <Box sx={{ mb: 1 }}>• Cylinder: V = πr²h (r = radius, h = height)</Box>
            <Box>• Cone: V = 1/3 πr²h (r = radius, h = height)</Box>
          </Typography>
        </MotionPaper>
      </Box>
    </Container>
  );
}

export default VolumePage;