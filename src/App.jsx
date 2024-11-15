import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Quiz from './pages/Quiz'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './pages/Profile'; 
import { useAuth } from './contexts/AuthContext'
import Calculator from './pages/Calculator'
import BasicShapesPage from './pages/BasicShapesPage';
import SurfaceAreaPage from './pages/SurfaceAreaPage';
import VolumePage from './pages/VolumePage';

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/basic-shapes" element={<BasicShapesPage />} />
          <Route path="/surface-area" element={<SurfaceAreaPage />} />
          <Route path="/volume" element={<VolumePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;