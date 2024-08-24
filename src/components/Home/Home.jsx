import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <Box>
      <Link to={'/admin'}>
        Go Admin
      </Link>
    </Box>
    </>
  )
}

export default Home