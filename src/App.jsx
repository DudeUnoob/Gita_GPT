import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Router} from "react-router-dom"
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route element={<Home />} exact path="/"></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
