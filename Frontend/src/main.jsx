import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import App from './App'
import { SocketProvider } from './Context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(

<SocketProvider>
<ChakraProvider>
  <App />
  </ChakraProvider>
</SocketProvider>
)
