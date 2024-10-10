import { useState } from 'react'
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import './App.css'
import Navbar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container-fluid vh-100">
      {/*//HEADER affichage indépendant de la navigation*/}
      <div className="row mb-4">
        <Navbar />
      </div>

      {/*// LAYOUT APP*/}
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
