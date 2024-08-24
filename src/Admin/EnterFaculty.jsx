import { Box, Input, Flex, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function EnterFaculty({setTrigger , trigger}) {
    const [name, setName]= useState('')
    const [sname, setSname]= useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
         const data=  {name:name,
            short:sname
            }
            api.post('/api/faculties',data)
            .then((res)=>{
                toast.success(res.data.message,{
                    position: "top-right",
                    autoClose:300
                })
            })
            .catch(err=> toast.error(err.response.data.message,{
                position: "top-right",
                autoClose:300
            }))
            .finally(()=>{
                setName('')
                setSname('')
                setTrigger(!trigger)
            })
        
    }
    return (
        <>
            <Box
            width={'fit-content'}
            >
                <form 
                onSubmit={handleSubmit}
                >
                    <Text
                    p={3}
                    fontSize={['.9rem','1.2rem','1.5rem']}
                    className='font-sans text-center'
                    >Enter Faculty</Text>
                        <Box
                        className='grid my-auto'
                        gridTemplateColumns={'auto auto'}
                        gap={[1,3,6]}
                        >
                        <label className='my-auto' htmlFor="name">Enter Faculty</label>
                        <Input type='text' id='name' value={name} onChange={(e)=>{
                                setName(e.target.value)
                            }} required/>
                            <label className='my-auto' htmlFor="short">Enter Shortform</label>
                            <Input type='text' id='short' value={sname} onChange={(e)=>{
                                setSname(e.target.value)
                            }} required/>
                        </Box>
                       
                    <Box
                    width={'100%'}
                    className='p-5 flex align-middle justify-center'
                    >
                        <Button type='submit'
                        fontSize={['.5rem','.8rem','1.2rem']}
                        w={['5rem','9rem','15rem']}>
                            Submit
                        </Button>

                    </Box>
                </form>
            </Box>
        </>
    )
}

export default EnterFaculty