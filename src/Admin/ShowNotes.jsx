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

function ShowNotes() {
    const [notes, setNotes] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [delvalue, setDelValue] = useState('')

    const fetchData = () => {
        api.get('/api/notes')
            .then(response => {
                console.log(response.data, 'data')
                setNotes(response.data)
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchData();
    }, [trigger]);

    const handleDeleteClick = (id, name) => {
        setSelectedFaculty(id);
        setShowAlert(true);
        setDelValue(name);
    };

    const confirmDelete = () => {
        if (selectedFaculty !== null) {
            api.delete(`/api/notes/${selectedFaculty}`)
                .then(() => {
                    setTrigger(!trigger); // Refresh data
                })
                .catch(error => console.error(error))
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
            <Box
                width={['100%', '100%', '95%']}
                margin={['2', '4', '6']}
                padding={['2', '4', '6']}
                boxShadow="0 0 4px gray"
                overflowX="auto"
                className="rounded"
            >
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th fontSize={[5,7,9,11]}>Note ID</Th>
                            <Th fontSize={[5,7,9,11]}>Notes</Th>
                            <Th fontSize={[5,7,9,11]}>Faculty</Th>
                            <Th fontSize={[5,7,11,11]}>Subject</Th>
                            <Th fontSize={[5,7,9,11]}>Semester</Th>
                            <Th fontSize={[5,7,9,11]}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {notes.map((note, index) => (
                            <Tr key={note.id}>
                                <Td fontSize={[4,6,8,10]}>{index + 1}</Td>
                                <Td fontSize={[4,6,8,10]}>{note.facultyShort + ' ' + note.subject + " Notes"}</Td>
                                <Td fontSize={[4,6,8,10]}>{note.faculty}</Td>
                                <Td fontSize={[4,6,8,10]}>{note.subject}</Td>
                                <Td fontSize={[4,6,8,10]}>{note.semester}</Td>
                                <Td>
                                <Button  size={[1,2,3,4]} as={Link} to={`/admin/faculty/edit/${note.id}`}  m={1}><FaEdit/></Button>
                                <Button size={[2,2,9,9]} onClick={() => handleDeleteClick(note.id, note.name)} m={1} >
                                        <MdDeleteForever />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            {showAlert && (
                <AlertDialog isOpen={showAlert} onClose={cancelDelete}>
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

export default ShowNotes;
