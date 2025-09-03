import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { store } from './components/redux/store.js'
import { Provider } from 'react-redux'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ModalProvider from './context/ModalProvider.jsx'

import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode >
)
