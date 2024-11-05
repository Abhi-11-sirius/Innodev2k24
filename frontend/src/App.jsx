/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from '../src/pages/LandingPage'
import SignUp from './pages/SignUp'
import SignUpMentor from './pages/signUpMentor'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard';
import ChangePasswordConfirm from './components/ChangePasswordConfirm'
import ContactUs from './pages/ContactUs';
import MentorSearchPage from './pages/MentorSeachPage';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signUpMentee' element={<SignUp/>}/>
          <Route path='/signUpMentor' element={<SignUpMentor/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Dashboard/>}/>
          <Route path='/resetPassword' element={<ResetPassword/>}/>
          <Route path='/reset-password/:token' element={<ChangePasswordConfirm />} />
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path ='/mentorSearch' element={<MentorSearchPage/>}/>
      </Routes>
    // <MentorSignup/>
  )
}

export default App