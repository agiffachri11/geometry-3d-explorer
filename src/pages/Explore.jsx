import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Divider,
  useTheme,
  TextField,
  Stack,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProgress } from '../services/db';

// Komponen untuk berbagai bentuk 3D
function Cube({ dimensions = {}, color = "red", position = [0, 0, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Sphere({ dimensions = {}, color = "red", position = [0, 0, 0] }) {
  const radius = dimensions.width / 2;
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cylinder({ dimensions = {}, color = "red", position = [0, 0, 0] }) {
  const radius = dimensions.width / 2;
  return (
    <mesh position={position}>
      <cylinderGeometry args={[radius, radius, dimensions.height, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cone({ dimensions = {}, color = "red", position = [0, 0, 0] }) {
  const radius = dimensions.width / 2;
  return (
    <mesh position={position}>
      <coneGeometry args={[radius, dimensions.height, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Explore() {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [selectedShape, setSelectedShape] = useState('cube');
  const [dimensions, setDimensions] = useState({ width: 1, height: 1, depth: 1 });
  const [color, setColor] = useState('red');
  const [shapesExplored, setShapesExplored] = useState(new Set());

  const handleShapeChange = (newShape) => {
    setSelectedShape(newShape);
    if (currentUser) {
      const newShapesExplored = new Set(shapesExplored);
      newShapesExplored.add(newShape);
      setShapesExplored(newShapesExplored);
    }
  };

  const handleDimensionChange = (dimension, value) => {
    if (value === "" || value === ".") {
      setDimensions(prev => ({
        ...prev,
        [dimension]: value
      }));
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    setDimensions(prev => ({
      ...prev,
      [dimension]: numValue
    }));
  };

  const shapes = {
    cube: {
      component: Cube,
      volume: (d) => d.width * d.height * d.depth,
      surfaceArea: (d) => 2 * (d.width * d.height + d.height * d.depth + d.width * d.depth)
    },
    sphere: {
      component: Sphere,
      volume: (d) => (4/3) * Math.PI * Math.pow(d.width/2, 3),
      surfaceArea: (d) => 4 * Math.PI * Math.pow(d.width/2, 2)
    },
    cylinder: {
      component: Cylinder,
      volume: (d) => Math.PI * Math.pow(d.width/2, 2) * d.height,
      surfaceArea: (d) => 2 * Math.PI * (d.width/2) * (d.width/2 + d.height)
    },
    cone: {
      component: Cone,
      volume: (d) => (1/3) * Math.PI * Math.pow(d.width/2, 2) * d.height,
      surfaceArea: (d) => {
        const radius = d.width/2;
        const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(d.height, 2));
        return Math.PI * radius * (radius + slantHeight);
      }
    },
  };

  const ShapeComponent = shapes[selectedShape].component;
  const volume = shapes[selectedShape].volume(dimensions).toFixed(2);
  const surfaceArea = shapes[selectedShape].surfaceArea(dimensions).toFixed(2);

  const colors = ['blue', 'green', 'red', 'purple'];
  const MotionPaper = motion(Paper);

  const renderDimensionInputs = () => {
    switch (selectedShape) {
      case 'cube':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Width"
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              inputProps={{ 
                step: "0.1",
                min: "0.1"
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="Height"
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              inputProps={{ 
                step: "0.1",
                min: "0.1"
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="Depth"
              type="number"
              value={dimensions.depth}
              onChange={(e) => handleDimensionChange('depth', e.target.value)}
              inputProps={{ 
                step: "0.1",
                min: "0.1"
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
          </Stack>
        );
      case 'sphere':
        return (
          <TextField
            fullWidth
            label="Diameter"
            type="number"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange('width', e.target.value)}
            inputProps={{ 
              step: "0.1",
              min: "0.1"
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">units</InputAdornment>,
            }}
          />
        );
      case 'cylinder':
      case 'cone':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Diameter"
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              inputProps={{ 
                step: "0.1",
                min: "0.1"
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="Height"
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              inputProps={{ 
                step: "0.1",
                min: "0.1"
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">units</InputAdornment>,
              }}
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* 3D Viewer */}
        <Grid item xs={12} md={8}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={3}
            sx={{ 
              height: 500, 
              borderRadius: 4,
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[4, 4, 4]} />
              <OrbitControls enableDamping />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <gridHelper args={[10, 10]} />
              <ShapeComponent dimensions={dimensions} color={color} />
            </Canvas>
          </MotionPaper>
        </Grid>

        {/* Controls */}
        <Grid item xs={12} md={4}>
          <MotionPaper
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            elevation={3}
            sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Shape Controls
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Shape</InputLabel>
              <Select
                value={selectedShape}
                label="Shape"
                onChange={(e) => handleShapeChange(e.target.value)}
              >
                <MenuItem value="cube">Cube</MenuItem>
                <MenuItem value="sphere">Sphere</MenuItem>
                <MenuItem value="cylinder">Cylinder</MenuItem>
                <MenuItem value="cone">Cone</MenuItem>
              </Select>
            </FormControl>

            <Typography gutterBottom>Dimensions</Typography>
            <Box sx={{ mb: 3 }}>
              {renderDimensionInputs()}
            </Box>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                label="Color"
                onChange={(e) => setColor(e.target.value)}
              >
                {colors.map((c) => (
                  <MenuItem key={c} value={c} sx={{ textTransform: 'capitalize' }}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider sx={{ my: 3 }} />
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Explore;