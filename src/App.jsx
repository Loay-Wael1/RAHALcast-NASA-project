import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import CheckWeather from './pages/CheckWeather'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Result from './pages/Result'
import Error from './components/Error'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={theme}>
      <BrowserRouter>
        <Nav theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkweather" element={<CheckWeather />} />
          <Route path="/checkweather/results" element={<Result />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </div>
  )
}

export default App