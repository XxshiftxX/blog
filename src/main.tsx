import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import { Index } from './components';
import { Show } from './components/show';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: ':slug',
    element: <Show />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
