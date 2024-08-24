import React, { useEffect,useState} from 'react'
import NavButton from './NavButton'
import { Box, Flex, Text } from '@chakra-ui/react'
import api from '../../api'
import { Link } from 'react-router-dom'

function Navbar() {

    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false)
    

    const fetchData = ()=>{
        setLoading(true)
        api.get('/api/faculties')
        .then(response => setData(response.data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
       console.log(data)
    },[loading])
  return (
    <>
    <Flex
    as={'nav'}
    className='p-2 z-50'
    justify={'space-between'}
    width={'100%'}
    boxShadow={'0 0 4px gray'}
    pos={'fixed'}
    top={0}
    left={0}
    right={0}
    
    > 
    <Box
    as={Link}
    to={'/'}
    h={'100%'}
    className='flex align-middle justify-center'
    >
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5d5AfjCq7YO7mNb_FbqxyhQU35V55jIT07A&s" alt="error" className='h-16 my-auto rounded-full'/>
      <Text
      my={'auto'}
      className='text-3xl text-gray-800 font-thin pl-1'
      >
        Notes
      </Text>
    </Box>
   <Flex
   className='p-2'
   gap={'.5rem'}
   >
   {
        loading?<>Loading</>:data.map((item,index)=>{
            return(
                
                    <NavButton key={index} id={item.id} value={item.name} link={`/${item.short}`}/>
             
            )
        })
    }
   </Flex>
    </Flex>
   
    </>
  )
}

export default Navbar