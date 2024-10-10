import { useState } from 'react'
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import './App.css'
import Navbar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="container-fluid">
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
