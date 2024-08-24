import React, { useState } from 'react'
import EnterSubject from './EnterSubject'
import ShowSubject from './ShowSubject'
import { Box } from '@chakra-ui/react'

function Subjects() {

  const [ trigger , setTrigger]= useState(true)

  return (
   <>
   <EnterSubject trigger={ trigger} setTrigger={setTrigger}/>

   <Box>
    <ShowSubject trigger={ trigger} setTrigger={setTrigger}/>
   </Box>
   </>
  )
}

export default Subjects