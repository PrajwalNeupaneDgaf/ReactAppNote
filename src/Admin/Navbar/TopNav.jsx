'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'


 function TopNav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
      maxWidth={'100%'}
      className='fixed top-0 right-0 left-0 z-30' 
      bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box
            as="h1"
            size={['xl', '2xl', '3xl']} 
            bgGradient="linear(to-r, teal.500, green.500)" // Linear gradient from teal to green
            bgClip="text" // Clips the background to the text, creating a gradient effect
            fontWeight="extrabold"
            fontFamily="'Poppins', sans-serif"
            
          color={useColorModeValue('black' ,'white')}
          >Admin</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={[2,3,4,7]}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default TopNav