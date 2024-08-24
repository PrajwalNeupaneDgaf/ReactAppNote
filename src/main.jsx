import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ChakraProvider>
    <ToastContainer/>
    <ColorModeScript   initialColorMode="dark" />
    <App />
  
   </ChakraProvider>
  </StrictMode>,
)
