import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { EmojiEvents, Refresh } from '@mui/icons-material';
import { getLeaderboard } from '../../services/db';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();

  const fetchLeaderboard = async (showRefreshing = true) => {
    try {
      if (showRefreshing) setRefreshing(true);
      setLoading(true);
      const data = await getLeaderboard(10);
      setLeaderboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(false);
    const interval = setInterval(() => fetchLeaderboard(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    fetchLeaderboard(true);
  };

  if (loading && !refreshing) {
    return <LeaderboardSkeleton />;
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEvents color="primary" />
          Top Performers
        </Typography>
        <Tooltip title="Refresh leaderboard">
          <IconButton 
            onClick={handleManualRefresh} 
            sx={{ 
              transform: refreshing ? 'rotate(360deg)' : 'none',
              transition: 'transform 1s'
            }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}

      {leaderboardData.length === 0 ? (
        <Alert severity="info">
          No quiz results yet. Be the first to take the quiz!
        </Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Player</TableCell>
                <TableCell align="right">Best Score</TableCell>
                <TableCell align="right">Quizzes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    bgcolor: index < 3 ? `rgba(255, 215, 0, ${0.1 - index * 0.03})` : 'inherit',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      bgcolor: index < 3 ? `rgba(255, 215, 0, ${0.2 - index * 0.03})` : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {index + 1}
                      {index < 3 && (
                        <EmojiEvents 
                          sx={{ 
                            color: ['#FFD700', '#C0C0C0', '#CD7F32'][index],
                            fontSize: 20
                          }} 
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          bgcolor: ['#FFD700', '#C0C0C0', '#CD7F32'][index] || theme.palette.primary.main,
                          fontWeight: 'bold'
                        }}
                      >
                        {user.email?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: index < 3 ? 600 : 400 }}>
                        {user.email?.split('@')[0]}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="right" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: index === 0 ? theme.palette.primary.main : 'inherit'
                    }}
                  >
                    {user.bestScore?.toFixed(0)}%
                  </TableCell>
                  <TableCell align="right">
                    {user.totalQuizzes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

function LeaderboardSkeleton() {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton width={150} height={32} />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Skeleton width={50} /></TableCell>
              <TableCell><Skeleton width={120} /></TableCell>
              <TableCell align="right"><Skeleton width={80} /></TableCell>
              <TableCell align="right"><Skeleton width={60} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton width={30} /></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton width={100} />
                  </Box>
                </TableCell>
                <TableCell align="right"><Skeleton width={60} /></TableCell>
                <TableCell align="right"><Skeleton width={40} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Leaderboard;