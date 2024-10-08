import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { Home } from './pages/home/Home'
import { AuthProvider } from './logic/AuthProvider'
import { Redirect } from './pages/redirect/Redirect'
import {ProtectedRoute} from './logic/ProtectedRoute'


function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Redirect></Redirect>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    }, 
    {
      path: '/home',
      element: 
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  )
}

export default App
