import './App.css';
import Greeting from "./pages/greeting/Greeting";
import Registration from './pages/registration/Registration';
import Profile from './pages/profiile/Profile';
import ConfirmEmail from './pages/confirmEmail/ConfirmEmail';
import ErrorPage from './pages/errorPage/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import ThemeProvider from "./components/ui/themeToggle/ThemeContext";
import EmailConfirmed from './pages/emailConfirmed/EmailConfirmed';
import SettingsPage from './pages/settings/SettingsPage';
import ResetPassword from './pages/resetPassword/ResetPassword';
import AuthController from './components/authController/AuthController';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Общедоступные маршруты */}
            <Route path="/" element={<Greeting />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/confirmEmail" element={<ConfirmEmail />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/emailConfirmed' element={<EmailConfirmed />} />

            {/* Приватные маршруты */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile/:id/folder/:folderId" element={<Profile />} />
              <Route path="/profile/:id/settings" element={<SettingsPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
