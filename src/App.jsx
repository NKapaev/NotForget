import './App.css';
import Greeting from "./components/pages/greeting/Greeting";
import Registration from './components/pages/registration/Registration';
import Profile from './components/pages/profiile/Profile';
import ConfirmEmail from './components/pages/confirmEmail/ConfirmEmail';
import ErrorPage from './components/pages/errorPage/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import ThemeProvider from "./context/ThemeContext";
import EmailConfirmed from './components/pages/emailConfirmed/EmailConfirmed';
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
            <Route path='/emailConfirmed' element={<EmailConfirmed />} />

            {/* Приватные маршруты */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile/:id/folder/:folderId" element={<Profile />} />
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
