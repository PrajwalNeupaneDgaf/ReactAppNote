import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, IconButton, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';

function ShowSubject({ trigger, setTrigger }) {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const [id, setId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [trigger]);

  const getData = () => {
    api
      .get('/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Error fetching subjects', {
          position: 'top-right',
          autoClose: 300,
        });
      });
  };

  const handleDeleteClick = (id, name) => {
    setId(id);
    setOpen(true);
    setDeleteItem(name);
  };

  const confirm = () => {
    api
      .delete(`/api/subjects/${id}`)
      .then((response) => {
        setTrigger(!trigger);
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 500,
        });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Error deleting subject', {
          position: 'top-right',
          autoClose: 500,
        });
      });
    setId('');
    setDeleteItem('');
    setOpen(false);
  };

  const cancel = () => {
    setId('');
    setDeleteItem('');
    setOpen(false);
  };

  return (
    <Box boxShadow="0 0 5px gray" borderRadius="xl" m={4} p={4} overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th fontSize={[5,7,9,9]} >S N</Th>
            <Th fontSize={[5,7,9,9]} >Subject Name</Th>
            <Th fontSize={[5,7,9,9]} >Faculty</Th>
            <Th fontSize={[5,7,9,9]} >Semester</Th>
            <Th fontSize={[5,7,9,9]} >Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subjects.map((subject, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{subject.name}</Td>
              <Td>{subject.faculty_short}</Td>
              <Td>{subject.semester}</Td>
              <Td>
                <Tooltip label="Edit" fontSize="md">
                  <IconButton
                  size={[7,9,11,13]}
                    icon={<FaEdit />}
                    onClick={() => navigate(`/admin/subject/edit/${subject.id}`)}
                    colorScheme="blue"
                    aria-label="Edit"
                    mx={1}
                  />
                </Tooltip>
                <Tooltip label="Delete" fontSize="md">
                  <IconButton
                    size={[7,9,11,13]}
                    icon={<MdDeleteForever />}
                    onClick={() => handleDeleteClick(subject.id, subject.name)}
                    colorScheme="red"
                    aria-label="Delete"
                    mx={1}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {open && (
        <DialogBox
          open={open}
          header="Delete The Content?"
          body={`Are You Sure You Want to Delete ${deleteItem} From The Table?`}
          buttonOk={confirm}
          buttonNo={cancel}
        />
      )}
    </Box>
  );
}

export default ShowSubject;
