import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

import Home from 'pages/home/Home'
import Login from 'pages/auth/login/Login'
import Registration from 'pages/auth/registration/Registration'
import Header from 'components/header/Header'

const route = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'registration', element: <Registration /> }
]
const AllRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {route.map(item => (
            <Route path={item.path} element={item.element} key={item.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AllRoutes
