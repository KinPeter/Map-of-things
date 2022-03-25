import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Demo from './Pages/Demo'
import Generator from './Pages/Generator'
import TileEditor from './Pages/TileEditor'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/demo" />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/tile-editor" element={<TileEditor />} />
        <Route path="*" element={<Navigate to="/demo" />} />
      </Routes>
    </div>
  )
}

export default App
