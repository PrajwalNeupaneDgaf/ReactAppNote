import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import EnterSemester from './EnterSemester'
import ShowSemester from './ShowSemester'

function Semesters() {
  const [trigger , setTrigger]= useState(true)
  return (
   <Box>
    <EnterSemester trigger={trigger} setTrigger={setTrigger}/>
    <ShowSemester trigger={trigger} setTrigger={setTrigger}/>
   </Box>
  )
}

export default Semesters