import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'


function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    }
  ])

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
