
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import TryNow from './Components/TryNow'
import NQueens from './Algorithms/NQueens'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /></>
    },
    {
      path: '/trynow',
      element: <><Navbar /><TryNow /></>
    },
    {
      path:'/nqueen',
      element: <NQueens></NQueens>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
