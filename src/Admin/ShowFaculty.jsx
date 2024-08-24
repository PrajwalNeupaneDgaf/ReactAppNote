import {
    Box,
    Button,
    Table,
    Td,
    Text,
    Th,
    Tr,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Thead,
    Tbody,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

function ShowFaculty({ trigger , setTrigger}) {
    const [faculties, setFaculties] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [delvalue , setDelValue] = useState('')

    const fetchData = () => {
        api.get('/api/faculties')
            .then(response => setFaculties(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchData();
    }, [trigger]);

    const handleDeleteClick = (id , name) => {
        setSelectedFaculty(id);
        setShowAlert(true);
        setDelValue(name)
    };

    const confirmDelete = () => {
        if (selectedFaculty !== null) {
            api.delete(`/api/faculties/${selectedFaculty}`)
                .then((res) => {
                    toast.success(res.data.message,{
                        position: "top-right",
                        autoClose: 700,
                    })
                    setTrigger(!trigger); // Refresh data
                })
                .catch(error => {
                    console.error(error);
                    toast.error("Unable to delete the Item",{
                        position: "top-right",
                        autoClose: 700
                    })
                })
                .finally(() => {
                    setShowAlert(false);
                    setSelectedFaculty(null);
                });
        }
    };

    const cancelDelete = () => {
        setShowAlert(false);
        setSelectedFaculty(null);
    };

    return (
        <>
            <Table
            boxShadow={'0 0 3px grey'}
            margin={'2vw'}
            width={'95%'}
            padding={'1vw'}
            className='rounded-lg'
            >
                <Thead>
                    <Tr>
                        <Th
                         fontSize={['.4rem','.5rem','.7rem','1rem']}
                        >S. N</Th>
                        <Th
                         fontSize={['.4rem','.5rem','.7rem','1rem']}
                        >Faculty Name</Th>
                        <Th
                         fontSize={['.4rem','.5rem','.7rem','1rem']}
                        >Faculty Short</Th>
                        <Th
                         fontSize={['.4rem','.5rem','.7rem','1rem']}
                        >Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {faculties.map((faculty,index) => (
                        <Tr key={faculty.id}>
                            <Td>{index +1}</Td>
                            <Td>{faculty.name}</Td>
                            <Td>{faculty.short}</Td>
                            <Td>
                                <Button size={[1,2,3,4]} className='m-2' as={Link} to={`/admin/faculty/edit/${faculty.id}`}><FaEdit/></Button>

                                <Button size={[1,2,3,4]}  onClick={() => handleDeleteClick(faculty.id , faculty.name)}>
                                    <MdDeleteForever/>
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>    

            {showAlert && (
                <AlertDialog
                    isOpen={showAlert}
                    onClose={cancelDelete}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>Confirm Deletion</AlertDialogHeader>
                            <AlertDialogBody>
                                <Text>Are you sure you want to delete this {delvalue}? This action cannot be undone.</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                                    Yes
                                </Button>
                                <Button onClick={cancelDelete} ml={3}>
                                    No
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
}

export default ShowFaculty;
