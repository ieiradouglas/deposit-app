import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Bars } from 'react-loader-spinner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import { Auth0Provider } from '@auth0/auth0-react'

const Loading = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="rgb(99 102 241)"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={process.env.VITE_VERCEL_DOMAIN}
    clientId={process.env.VITE_VERCEL_CLIENTID}
    authorizationParams={{
      redirect_uri: process.env.VITE_VERCEL_AUTHORIZATIONPARAMS
    }}>
    <ChakraProvider>
      <React.StrictMode>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense >
      </React.StrictMode>
    </ChakraProvider>
  </Auth0Provider>
)
