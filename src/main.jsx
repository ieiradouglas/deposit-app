import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Bars } from 'react-loader-spinner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Produtos from './pages/Produtos'

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
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/produtos',
    element: <Produtos />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_DOMAIN}
    clientId={import.meta.env.VITE_CLIENTID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_AUTHORIZATIONPARAMS
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
