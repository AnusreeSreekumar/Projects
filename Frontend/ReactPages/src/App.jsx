import React from 'react'
import Home from './pages/playerPages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './pages/playerPages/Authentication';
import Dashboard from './pages/playerPages/Dashboard'
import AdminDashboard from './pages/adminPages/AdminDashboard';
import AddQuiz from './pages/adminPages/AddQuiz';
import DisplayQuizSet from './pages/adminPages/DisplayQuizSet';
import QuizDetailsPage from './pages/adminPages/QuizDetailsPage';

const App = () => {

  return (

    <Router>
      <Routes>
        {/* Default Route for Player (Homepage) */}
        <Route path='/' element={<Home />} />
        <Route path='/authenticate' element={<Authentication />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path='/player-dashboard' element={<Dashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/addQuiz' element={<AddQuiz />} />
        <Route path='/displayquizset' element={<DisplayQuizSet />} />
        <Route path='/quizdetails/:quizId' element={<QuizDetailsPage />} />
      </Routes>

    </Router>
  )
}

export default App
