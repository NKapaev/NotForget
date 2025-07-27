import './App.css';
import Greeting from "./components/pages/greeting/Greeting";
import Registration from './components/pages/registration/Registration';
import Login from "./components/pages/login/Login";
import Profile from './components/pages/profiile/Profile';
import EmailConfirmed from './components/pages/confirmEmail/EmailConfirmed';
import NotFound from "./components/pages/notFound/NotFound";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/confirmEmail' element={<EmailConfirmed />}></Route>
          {/* Маршрут 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
