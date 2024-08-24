import React from 'react'
import TopNav from '../Navbar/TopNav'
import { Box } from '@chakra-ui/react'
import SideNav from '../Navbar/SideNav'

function AdminLayout({children}) {
  return (
    <div>
        <Box
        maxW={'100%'}
        >
        <TopNav/>
        </Box>
        <Box
        >
            <SideNav/>
        </Box>
        <Box
        maxW={'100%'}
        marginTop={['12rem','12rem','5rem','5rem']}
        marginLeft={[0,0,'8rem','14rem']}
        fontSize={['.4rem','.5rem','.99rem']}
        >
        {children}
        </Box>
    </div>
  )
}

export default AdminLayout