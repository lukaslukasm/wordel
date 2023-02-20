import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Signin from './components/Signin'
import StateContextProvider from './components/StateContextProvider'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="flex px-5 max-w-3xl mx-auto flex-col gap-12 h-screen justify-center items-center">
    <img src="https://cdn.dribbble.com/users/2181348/screenshots/4517593/gears_motor.gif" alt="gears" className="w-44 invert mix-blend-color-dodge" />
    <h1>Wordeľ je momentálne v procese vylepšovania, novú verziu môžeš očakávať v najbližších dňoch.</h1>
  </div>
)
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <StateContextProvider>
//     <RouterProvider router={router} />
//   </StateContextProvider>
// )

