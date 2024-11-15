import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProgress } from '../services/db';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Assessment,
  School,
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

function Profile() {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (currentUser) {
        const progress = await getUserProgress(currentUser.uid);
        setUserProgress(progress);
        setLoading(false);
      }
    };
    fetchProgress();
  }, [currentUser]);

  // Format data untuk grafik
  const quizData = userProgress?.quizHistory?.map((quiz, index) => ({
    attempt: index + 1,
    score: quiz.score,
    date: new Date(quiz.timestamp).toLocaleDateString()
  })) || [];

  const statsCards = [
    {
      title: 'Best Score',
      value: userProgress?.stats?.bestScore?.toFixed(0) || '0',
      unit: '%',
      icon: <Assessment />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Quizzes Taken',
      value: userProgress?.stats?.totalQuizzes || '0',
      unit: '',
      icon: <School />,
      color: theme.palette.secondary.main,
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: theme.palette.primary.main }}>
                {currentUser?.email[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {currentUser?.email.split('@')[0]}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Member since {new Date(userProgress?.createdAt || Date.now()).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} key={stat.title}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h3" component="div">
                {stat.value}
                <Typography component="span" variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
                  {stat.unit}
                </Typography>
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Quiz Progress Chart */}
        {quizData.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" gutterBottom>Quiz Progress</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={quizData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]} // Set interval yang diinginkan
                    tickFormatter={(value) => `${value}%`} // Tambahkan simbol %
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={theme.palette.primary.main} 
                    activeDot={{ r: 8 }} 
                    name="Quiz Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Profile;