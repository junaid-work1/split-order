import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Registration from './pages/auth/registration/Registration'
import Home from './pages/home/Home'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
