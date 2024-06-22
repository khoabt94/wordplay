import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/system";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, ModalProvider, SocketProvider } from './providers'
import { AppRoutes } from './routes/app-routes'
import { Toaster } from './components/toast/toaster'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <NextUIProvider>
        <AuthProvider>
          <SocketProvider>
            <AppRoutes />
            <Toaster />
            <ModalProvider />
          </SocketProvider>
        </AuthProvider>
      </NextUIProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>,
)
