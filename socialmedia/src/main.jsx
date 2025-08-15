import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import Front from './Pages/Front.jsx'
import ProtectedRoute from './Components/ProtectedRouter.jsx'
import {store} from "./redux/store.js"
import {Provider} from 'react-redux'

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<App/>
//   },
   
//   {
//     path:'/front',
//      element: (
//     <ProtectedRoute>
//       <Front />
//     </ProtectedRoute>
//   ),
//     children:[
//       {
//         path:'/front',
//         element:<Home/>
//       },
//       {
//         path:'profile',
//         element:<Profile/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/front',
    element: (
      <ProtectedRoute>
        <Front />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '', // Matches /front
        element: <Home />,
      },
      {
        path: 'profile', // Matches /front/profile
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router = {router}/>
    </Provider>
  </StrictMode>,
)
