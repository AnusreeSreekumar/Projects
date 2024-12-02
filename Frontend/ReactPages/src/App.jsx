import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Authentication from './pages/playerPages/Authentication';
import Dashboard from './pages/playerPages/Dashboard'
import AdminDashboard from './pages/adminPages/AdmiHome';
import AddQuiz from './pages/adminPages/AddQuiz';
import DisplayQuizSet from './pages/adminPages/AdminQuizTopics';
import QuizDetailsPage from './pages/adminPages/QuizDetailsPage';
import QuizTopics from './pages/playerPages/QuizTopics';
import TakeQuiz from './pages/playerPages/TakeQuiz';

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
        <Route path='/quiztopics' element={<QuizTopics />} />
        <Route path='/quizdetails/:quizId' element={<QuizDetailsPage />} />
        <Route path='/takequiz/:quizId' element={<TakeQuiz />} />
      </Routes>

    </Router>
  )
}

export default App
