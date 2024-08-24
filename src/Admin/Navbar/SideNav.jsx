import { Box ,useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import NavButton from '../../components/Navbar/NavButton'

function SideNav() {
  return (
    <>
    <Box 
    pos={'fixed'}
    bg={useColorModeValue('gray.100', 'gray.900')}
    top={'4rem'}
    right={[0,0,'','']}
    left={'0rem'}
    bottom={['','',0,0]}
    fontSize={['.5rem','7rem','1.1rem','1.4rem']}
    width={['100%','100%' ,'8rem','12rem']}
    gap={[0,4,4]}
    className=' flex align-middle z-20'
    flexDir={['row','row','column','column']}
    >
        <NavButton label="Home" link="/admin" value='Faculty'/>
        <NavButton label="Home" link="/admin/note" value='Notes'/>
        <NavButton label="Home" link="/admin/subject" value='Subjects'/>
        <NavButton label="Home" link="/admin/semester" value='Semesters'/>
        <NavButton label="Home" link="/" value='Return'/>
    </Box>
    </>
)
}

export default SideNav