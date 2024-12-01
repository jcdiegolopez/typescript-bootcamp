import ReactDOM from 'react-dom/client'
import './index.css'
import React from 'react'
import {  createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './routes/routes';

const browserRouter = createBrowserRouter(routes); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <RouterProvider router={browserRouter}/>
  </React.StrictMode>
)
