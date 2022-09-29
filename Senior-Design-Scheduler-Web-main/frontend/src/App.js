import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import StudentPage from './pages/StudentPage';
import Professor from './pages/Professor';
import CalPage from './pages/CalPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NavBar from './components/NavBar';
import MakeSchedulePage from './pages/MakeSchedulePage';
import ConfirmPasswordPage from './pages/ConfirmPasswordPage';
import ConfirmedUserPage from './pages/ConfirmedUserPage';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
        <BrowserRouter>
          <Routes>
              <Route path="/" index element={<LoginPage />} />
              <Route path="/group13-project2/Student" index element={<StudentPage />} />
              <Route path="/group13-project2/Professor" index element={<Professor/>}/>
              <Route path="/group13-project2/MakeSchedule" index element={<MakeSchedulePage/>}/>
              <Route path="/group13-project2/ProfessorPage" index element={<CalPage/>}/>
              <Route path="/group13-project2/ForgotPasswordPage" index element={<ForgotPasswordPage/>}/>
              <Route path="/group13-project2/ResetPasswordPage" index element={<ResetPasswordPage/>}/>
              <Route path="/group13-project2/ConfirmPasswordPage" index element={<ConfirmPasswordPage/>}/>
              <Route path="/group13-project2/ConfirmedUserPage" index element={<ConfirmedUserPage/>}/>
          </Routes>
      </BrowserRouter>
  </React.Fragment>
);
}

export default App;
