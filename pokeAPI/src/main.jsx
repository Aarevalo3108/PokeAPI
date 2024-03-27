import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className='text-3xl text-gray-200'>Bienvenido</h1>} />
        <Route path="/pokedex" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
