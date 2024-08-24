import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, Button, Text } from '@chakra-ui/react'
import React from 'react'

function DialogBox({header,body,buttonOk,okValue,buttonNo,noValue,open}) {
  return (
    <>
        <AlertDialog
        isOpen={open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    {header}
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text>
                        {body}
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button colorScheme='blue' className=' m-2' onClick={buttonOk}>{okValue || "yes"}</Button>
                    <Button colorScheme='red' className='m-2' onClick={buttonNo}>{noValue || "No"}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  )
}

export default DialogBox