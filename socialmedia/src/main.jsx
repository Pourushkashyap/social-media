import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import Front from './Pages/Front.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
   
  {
    path:'/front',
    element:<Front/>,
    children:[
      {
        path:'/front',
        element:<Home/>
      },
      {
        path:'profile',
        element:<Profile/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
    
  </StrictMode>,
)
