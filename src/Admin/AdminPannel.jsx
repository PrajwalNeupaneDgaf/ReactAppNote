import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EnterFaculty from './EnterFaculty'
import EnterNote from './EnterNote'
import ShowFaculty from './ShowFaculty'

function AdminPannel() {
    const [trigger , setTrigger] = useState(true);
    return (
        <>
            <Box
            boxShadow={'0 0 4px gray'}
            padding={'2vw'}
            margin={'3vw'}
            className='flex justify-center rounded '
            >
                <EnterFaculty trigger={trigger} setTrigger={setTrigger}/>
            </Box>
            <ShowFaculty trigger={trigger} setTrigger={setTrigger}/>
        </>
    )
}

export default AdminPannel