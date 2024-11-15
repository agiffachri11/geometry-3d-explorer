import { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Stack,
  Divider
} from '@mui/material';
import { Calculate } from '@mui/icons-material';

function Calculator() {
  const [shape, setShape] = useState('cube');
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    radius: ''
  });
  const [results, setResults] = useState({
    volume: null,
    surfaceArea: null
  });

  const shapes = [
    { value: 'cube', label: 'Cube' },
    { value: 'sphere', label: 'Sphere' },
    { value: 'cylinder', label: 'Cylinder' },
    { value: 'cone', label: 'Cone' }
  ];

  const calculate = () => {
    let volume = 0;
    let surfaceArea = 0;
    const { width, height, radius } = dimensions;
    const w = parseFloat(width);
    const h = parseFloat(height);
    const r = parseFloat(radius);

    switch(shape) {
      case 'cube':
        volume = Math.pow(w, 3);
        surfaceArea = 6 * Math.pow(w, 2);
        break;
      case 'sphere':
        volume = (4/3) * Math.PI * Math.pow(r, 3);
        surfaceArea = 4 * Math.PI * Math.pow(r, 2);
        break;
      case 'cylinder':
        volume = Math.PI * Math.pow(r, 2) * h;
        surfaceArea = 2 * Math.PI * r * (r + h);
        break;
      case 'cone':
        volume = (1/3) * Math.PI * Math.pow(r, 2) * h;
        const s = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));
        surfaceArea = Math.PI * r * (r + s);
        break;
      default:
        break;
    }

    setResults({
      volume: volume.toFixed(2),
      surfaceArea: surfaceArea.toFixed(2)
    });
  };

  const renderInputs = () => {
    switch(shape) {
      case 'cube':
        return (
          <TextField
            fullWidth
            label="Side Length"
            type="number"
            value={dimensions.width}
            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
          />
        );
      case 'sphere':
        return (
          <TextField
            fullWidth
            label="Radius"
            type="number"
            value={dimensions.radius}
            onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
          />
        );
      case 'cylinder':
      case 'cone':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Radius"
              type="number"
              value={dimensions.radius}
              onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
            />
            <TextField
              fullWidth
              label="Height"
              type="number"
              value={dimensions.height}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Calculate color="primary" />
        Shape Calculator
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Input Dimensions</Typography>
            
            <Stack spacing={3}>
              <TextField
                select
                fullWidth
                label="Select Shape"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
              >
                {shapes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {renderInputs()}

              <Button 
                variant="contained" 
                onClick={calculate}
                disabled={!dimensions.width && !dimensions.radius}
              >
                Calculate
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Results</Typography>
            
            {results.volume !== null && (
              <Box>
                <Stack spacing={2}>
                  <div>
                    <Typography color="text.secondary">Volume</Typography>
                    <Typography variant="h4">
                      {results.volume}
                      <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                        cubic units
                      </Typography>
                    </Typography>
                  </div>

                  <Divider />

                  <div>
                    <Typography color="text.secondary">Surface Area</Typography>
                    <Typography variant="h4">
                      {results.surfaceArea}
                      <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                        square units
                      </Typography>
                    </Typography>
                  </div>
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Calculator;