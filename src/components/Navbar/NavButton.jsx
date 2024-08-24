import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavButton({id,link,value}) {
  return (
   <>
    <Box 
    fontSize={['.45rem','.9rem','1.3rem']}
    as={Link} to={link} key={id}
    className='p-4 font-sans text-xl'
    _hover={
        {
            borderBottom:'3px solid gray',
            color:'grey'
        }
    }
    >
    {value}
    </Box>
   </>
  )
}

export default NavButton