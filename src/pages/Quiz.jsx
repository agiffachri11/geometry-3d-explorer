import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Alert,
  Grid
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import quizQuestions from '../data/quizQuestions';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Cube, Sphere, Cylinder, Cone } from '../components/3d-objects/Shapes';
import Leaderboard from '../components/quiz/Leaderboard';
import { saveQuizResult } from '../services/db';

function QuizQuestion({ 
  question, 
  options, 
  selectedAnswer, 
  onAnswerSelect, 
  shape,
  explanation,
  isAnswered,
  isCorrect 
}) {
  const Shape = {
    cube: Cube,
    sphere: Sphere,
    cylinder: Cylinder,
    cone: Cone
  }[shape.type];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        borderRadius: 4,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Grid container spacing={4}>
        {/* 3D Visualization */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden' }}>
            <Canvas>
              <PerspectiveCamera makeDefault position={[4, 4, 4]} />
              <OrbitControls enableDamping />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <gridHelper args={[10, 10]} />
              <Shape dimensions={shape.dimensions} color={shape.color} />
            </Canvas>
          </Box>
        </Grid>

        {/* Question and Options */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {question}
          </Typography>

          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => onAnswerSelect(e.target.value)}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                disabled={isAnswered}
              />
            ))}
          </RadioGroup>

          {isAnswered && (
            <Box sx={{ mt: 2 }}>
              <Alert severity={isCorrect ? "success" : "error"}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </Alert>
              <Typography 
                variant="body2" 
                sx={{ mt: 2, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}
              >
                {explanation}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

function Quiz() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = async () => {
    const correctAnswers = Object.entries(answers).filter(
      ([index, answer]) => answer === quizQuestions[index].correctAnswer
    ).length;
    const finalScore = (correctAnswers / quizQuestions.length) * 100;
    setScore(finalScore);
  
    if (currentUser) {
      try {
        const result = {
          score: finalScore,
          totalQuestions: quizQuestions.length,
          correctAnswers,
          userEmail: currentUser.email,
          timestamp: new Date().toISOString()
          // Hapus duration di sini
        };
        await saveQuizResult(currentUser.uid, result);
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Hasil Quiz */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Quiz Complete!
                </Typography>
                <Typography variant="h2" sx={{ color: 'primary.main', my: 4 }}>
                  {score.toFixed(0)}%
                </Typography>
                <Typography variant="body1" gutterBottom>
                  You answered {Object.keys(answers).length} questions and got{' '}
                  {Math.round((score / 100) * quizQuestions.length)} correct.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={restartQuiz}
                    sx={{ mr: 2 }}
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/explore')}
                  >
                    Practice More
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Leaderboard */}
          <Grid item xs={12} md={4}>
            <Leaderboard />
          </Grid>
        </Grid>
      </Container>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuizQuestion
            {...currentQuestion}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            isAnswered={Boolean(answers[currentQuestionIndex])}
            isCorrect={answers[currentQuestionIndex] === currentQuestion.correctAnswer}
          />
        </motion.div>
      </AnimatePresence>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!answers[currentQuestionIndex]}
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;