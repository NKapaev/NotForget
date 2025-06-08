import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/about" element={<Login />} />
          <Route path="/about" element={<Registration />} />
          {/* Маршрут 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
