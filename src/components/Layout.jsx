import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar/Navbar'

function Layout({children}) {
  return (
    <Box
    p={'6rem 0 0 0'}
    >
        <Navbar />
        {children}
    </Box>
  )
}

export default Layout